SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `price` decimal(20, 6) NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` (`name`, `description`, `price`) VALUES ('Laptop Pro', 'High performance laptop for developers', 1200.50);
INSERT INTO `products` (`name`, `description`, `price`) VALUES ('Wireless Mouse', 'Ergonomic wireless mouse', 25.99);
-- INSERT INTO `products` (`name`, `description`, `price`) VALUES ('Mechanical Keyboard', 'RGB Mechanical keyboard with blue switches', 89.00);
-- INSERT INTO `products` (`name`, `description`, `price`) VALUES ('Monitor 4K', '27-inch 4K UHD Monitor', 350.00);

SET FOREIGN_KEY_CHECKS = 1;