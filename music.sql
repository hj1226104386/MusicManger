/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50546
Source Host           : localhost:3306
Source Database       : music

Target Server Type    : MYSQL
Target Server Version : 50546
File Encoding         : 65001

Date: 2017-11-19 22:48:56
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
  `source` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of list
-- ----------------------------
INSERT INTO `list` VALUES ('1', '唐人', '★★', '4:15', '孙子涵', 'http://fs.w.kugou.com/201711191959/e7ca916e448eb8bcb3c0313a29d90562/G009/M04/07/0B/SQ0DAFUOC-eAPl51ADe427BOnfo393.mp3');
INSERT INTO `list` VALUES ('2', '不变的音乐', '★★★★★', '6666', '王绎龙', 'http://fs.w.kugou.com/201711191934/bc9c63aaa907bb9d0cb69cf1be14a749/G014/M04/04/03/Tg0DAFUOaRyAea91AEAoUQW_Qx8127.mp3');
INSERT INTO `list` VALUES ('3', '一百个放心1', '★★★', '2:12', '张津涤', 'http://fs.w.kugou.com/201711191949/16301bec210256871982dff1ecb71dd2/G012/M02/15/11/rIYBAFULdtyAPbOSAD1LbSMsd5A175.mp3');
INSERT INTO `list` VALUES ('4', '红日', '★★★', '2:12', '李克勤', null);
INSERT INTO `list` VALUES ('5', '不要在我寂寞的时候说爱我', '★★★', '4:15', '郑源', null);
INSERT INTO `list` VALUES ('7', '两个人', '★★★★', '4:15', '蔡妍', null);
INSERT INTO `list` VALUES ('9', '等一分钟', '★★★★★', '4:15', '徐誉滕', null);
INSERT INTO `list` VALUES ('10', '年轮', '★★', '4:15', '张碧晨', null);
INSERT INTO `list` VALUES ('11', '电音之王', '★★★★★', '4:15', '王绎龙', null);
INSERT INTO `list` VALUES ('12', '认真的雪', '★★★', '4:15', '薛之谦', null);
INSERT INTO `list` VALUES ('13', '认真的雪', '★★★', '4:15', '薛之谦', '');
INSERT INTO `list` VALUES ('14', '认真的雪', '★★★', '4:15', '薛之谦', '');
INSERT INTO `list` VALUES ('15', '认真的雪', '★★★', '4:15', '薛之谦', '');
INSERT INTO `list` VALUES ('16', '认真的雪', '★★★', '4:15', '薛之谦', '');
