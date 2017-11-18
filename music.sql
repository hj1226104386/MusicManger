/*
Navicat MySQL Data Transfer

Source Server         : huangjin
Source Server Version : 50546
Source Host           : localhost:3306
Source Database       : music

Target Server Type    : MYSQL
Target Server Version : 50546
File Encoding         : 65001

Date: 2017-11-18 20:04:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for list
-- ----------------------------
DROP TABLE IF EXISTS `list`;
CREATE TABLE `list` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `song` varchar(255) DEFAULT NULL,
  `hot` varchar(255) DEFAULT NULL COMMENT '热度，值为1到5',
  `duration` varchar(255) DEFAULT NULL,
  `singer` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of list
-- ----------------------------
INSERT INTO `list` VALUES ('1', '唐人', '★★', '4:15', '孙子涵');
INSERT INTO `list` VALUES ('2', '不变的音乐', '★★★★★', '2:12', '王绎龙');
INSERT INTO `list` VALUES ('3', '一百个放心', '★★★', '2:12', '张津涤');
INSERT INTO `list` VALUES ('4', '红日', '★★★', '2:12', '李克勤');
INSERT INTO `list` VALUES ('5', '不要在我寂寞的时候说爱我', '★★★', '4:15', '郑源');
INSERT INTO `list` VALUES ('6', 'Poker face', '★', '4:15', 'Lady GaGa');
INSERT INTO `list` VALUES ('7', '两个人', '★★★★', '4:15', '蔡妍');
INSERT INTO `list` VALUES ('8', '为你而活', '★', '4:15', '神木与瞳');
INSERT INTO `list` VALUES ('9', '等一分钟', '★★★★★', '4:15', '徐誉滕');
INSERT INTO `list` VALUES ('10', '年轮', '★★', '4:15', '张碧晨');
INSERT INTO `list` VALUES ('11', '电音之王', '★★★★★', '4:15', '王绎龙');
INSERT INTO `list` VALUES ('12', '认真的雪', '★★★', '4:15', '薛之谦');
