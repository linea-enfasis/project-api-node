import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import readline from 'readline';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from '../src/config.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// ANSI Colors
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    red: "\x1b[31m",
};

async function initDB() {
    console.log(`\n${colors.bright}${colors.cyan}🚀 Iniciando inicialización de la base de datos...${colors.reset}\n`);

    try {
        console.log(`${colors.blue}📡 Configuración detectada:${colors.reset}`);
        console.log(`   - Host: ${colors.cyan}${DB_HOST}${colors.reset}`);
        console.log(`   - Puerto: ${colors.cyan}${DB_PORT}${colors.reset}`);
        console.log(`   - Usuario: ${colors.cyan}${DB_USER}${colors.reset}`);
        console.log(`   - Base de Datos: ${colors.cyan}${DB_DATABASE}${colors.reset}\n`);

        const isNonInteractive = process.argv.includes('--yes') || process.argv.includes('-y');

        if (!isNonInteractive) {
            const confirm = await question(`${colors.yellow}⚠️  Esto eliminará la tabla 'products' si existe. ¿Deseas continuar? (y/n): ${colors.reset}`);

            if (confirm.toLowerCase() !== 'y' && confirm.toLowerCase() !== 's') {
                console.log(`\n${colors.red}❌ Operación cancelada por el usuario.${colors.reset}\n`);
                rl.close();
                return;
            }
        } else {
            console.log(`${colors.cyan}ℹ️  Modo no interactivo detectado (--yes). Continuando...${colors.reset}`);
        }

        console.log(`\n${colors.blue}📡 Conectando a MySQL en ${DB_HOST}:${DB_PORT}...${colors.reset}`);

        // Connect without database first to ensure we can create it or just check connection
        const connection = await mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            port: DB_PORT,
            multipleStatements: true
        });

        console.log(`${colors.green}✅ Conexión establecida.${colors.reset}`);

        console.log(`${colors.blue}🛠️  Verificando base de datos '${DB_DATABASE}'...${colors.reset}`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\`;`);
        await connection.query(`USE \`${DB_DATABASE}\`;`);
        console.log(`${colors.green}✅ Base de datos lista.${colors.reset}`);

        console.log(`${colors.blue}📜 Leyendo archivo 'products.sql'...${colors.reset}`);
        const sqlPath = path.join(process.cwd(), 'products.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log(`${colors.blue}⏳ Ejecutando scripts SQL...${colors.reset}`);
        await connection.query(sql);

        console.log(`\n${colors.bright}${colors.green}✨ ¡Base de datos inicializada con éxito!${colors.reset}`);
        console.log(`${colors.cyan}--------------------------------------------------${colors.reset}`);
        console.log(`${colors.bright}Tabla 'products' creada y lista para usar.${colors.reset}`);
        console.log(`${colors.cyan}--------------------------------------------------${colors.reset}\n`);

        await connection.end();
    } catch (error) {
        console.error(`\n${colors.red}💥 Error durante la inicialización:${colors.reset}`);
        console.error(`${colors.red}${error.message}${colors.reset}\n`);
    } finally {
        rl.close();
    }
}

initDB();
