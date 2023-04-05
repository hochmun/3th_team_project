CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_terms` (
  `term_type` TINYINT NOT NULL,
  `term_title` VARCHAR(100) NOT NULL,
  `term_title_num` TINYINT NOT NULL,
  `term_sub_title` VARCHAR(100) NOT NULL,
  `term_sub_title_num` TINYINT NOT NULL,
  `term_content` TEXT NOT NULL)
  
CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_member` (
  `member_uid` VARCHAR(20) NOT NULL PRIMARY KEY,
  `member_pass` VARCHAR(255) NOT NULL,
  `member_email` VARCHAR(100) NOT NULL,
  `member_nick` VARCHAR(20) NOT NULL,
  `member_point` INT NOT NULL DEFAULT 0,
  `member_regip` VARCHAR(100) NOT NULL,
  `member_status` TINYINT NOT NULL DEFAULT 0,
  `member_rdate` DATETIME NOT NULL,

## 2023/03/28 // 심규영 // 갤러리 조회수 기록 테이블 생성 쿼리문
CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_gell_hit_log` (
  `hit_gell_num` INT NOT NULL,
  `hit_rdate` DATETIME NOT NULL,
  PRIMARY KEY (`hit_gell_num`),
  INDEX `rdate` (`hit_rdate` DESC) VISIBLE,
  CONSTRAINT `fk_gc_gell_hit_log_gc_gell1`
    FOREIGN KEY (`hit_gell_num`)
    REFERENCES `GC_Inside`.`gc_gell` (`gell_num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
  `member_wdate` DATETIME NULL,
  `member_sanctions_rdate` DATETIME NULL,
  `member_sanctions_wdate` DATETIME NULL,
  `member_sanctions_grade` TINYINT NULL,
  UNIQUE INDEX `member_email_UNIQUE` (`member_email`),
  INDEX `member_point_index` (`member_point`),
  INDEX `member_nick_index` (`member_nick` ASC),
  INDEX `member_rdate_index` (`member_status` ASC, `member_rdate` DESC))
  
CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_gell_cate1` (
  `gell_cate1` TINYINT NOT NULL AUTO_INCREMENT,
  `gell_cate1_name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`gell_cate1`))
ENGINE = INNODB
GC_Inside

CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_gell_cate2` (
  `gell_cate2` TINYINT NOT NULL AUTO_INCREMENT,
  `gell_cate1` TINYINT NOT NULL,
  `gell_cate2_name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`gell_cate2`),
  INDEX `fk_gc_gell_cate2_gc_gell_cate1_idx` (`gell_cate1` ASC),
  CONSTRAINT `fk_gc_gell_cate2_gc_gell_cate1`
    FOREIGN KEY (`gell_cate1`)
    REFERENCES `GC_Inside`.`gc_gell_cate1` (`gell_cate1`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = INNODB

CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_gell` (
  `gell_num` INT NOT NULL AUTO_INCREMENT,
  `gell_cate` TINYINT NOT NULL,
  `gell_name` VARCHAR(12) NOT NULL,
  `gell_address` VARCHAR(20) NOT NULL,
  `gell_main_img` VARCHAR(255) NULL,
  `gell_info` VARCHAR(200) NOT NULL,
  `gell_manager` VARCHAR(20) NOT NULL,
  `gell_grade` TINYINT NOT NULL,
  `gell_status` TINYINT NOT NULL DEFAULT 0,
  `gell_hit` INT NOT NULL DEFAULT 0,
  `gell_article_count` INT NOT NULL DEFAULT 0,
  `gell_rdate` DATETIME NOT NULL,
  `gell_wdate` DATETIME NULL,
  `gell_sanctions_rdate` DATETIME NULL,
  `gell_sanctions_wdate` DATETIME NULL,
  `gell_sanctions_grade` TINYINT NULL,
  PRIMARY KEY (`gell_num`),
  UNIQUE INDEX `gell_name_UNIQUE` (`gell_name` ASC),
  UNIQUE INDEX `gell_address_UNIQUE` (`gell_address` ASC),
  INDEX `fk_gc_gell_gc_gell_cate21_idx` (`gell_cate` ASC),
  INDEX `fk_gc_gell_gc_member1_idx` (`gell_manager` ASC),
  CONSTRAINT `fk_gc_gell_gc_gell_cate21`
    FOREIGN KEY (`gell_cate`)
    REFERENCES `GC_Inside`.`gc_gell_cate2` (`gell_cate2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gc_gell_gc_member1`
    FOREIGN KEY (`gell_manager`)
    REFERENCES `GC_Inside`.`gc_member` (`member_uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = INNODB

gc_gell_relation_gellCREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_gell_relation_gell` (
  `relation_num` INT NOT NULL AUTO_INCREMENT,
  `relation_gell_num` INT NOT NULL,
  `relation_relation_gell_num` INT NOT NULL,
  PRIMARY KEY (`relation_num`),
  INDEX `fk_gc_gell_relation_gell_gc_gell1_idx` (`relation_gell_num` ASC),
  INDEX `fk_gc_gell_relation_gell_gc_gell2_idx` (`relation_relation_gell_num` ASC),
  CONSTRAINT `fk_gc_gell_relation_gell_gc_gell1`
    FOREIGN KEY (`relation_gell_num`)
    REFERENCES `GC_Inside`.`gc_gell` (`gell_num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gc_gell_relation_gell_gc_gell2`
    FOREIGN KEY (`relation_relation_gell_num`)
    REFERENCES `GC_Inside`.`gc_gell` (`gell_num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = INNODB

CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_gell_sub_manager` (
  `sub_manager_num` INT NOT NULL AUTO_INCREMENT,
  `sub_manager_gell_num` INT NOT NULL,
  `sub_manager_uid` VARCHAR(20) NOT NULL,
  `sub_manager_grade` TINYINT NOT NULL,
  `sub_manager_rdate` DATETIME NOT NULL,
  INDEX `fk_gc_gell_sub_manager_gc_gell1_idx` (`sub_manager_gell_num` ASC),
  INDEX `fk_gc_gell_sub_manager_gc_member1_idx` (`sub_manager_uid` ASC),
  PRIMARY KEY (`sub_manager_num`),
  CONSTRAINT `fk_gc_gell_sub_manager_gc_gell1`
    FOREIGN KEY (`sub_manager_gell_num`)
    REFERENCES `GC_Inside`.`gc_gell` (`gell_num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gc_gell_sub_manager_gc_member1`
    FOREIGN KEY (`sub_manager_uid`)
    REFERENCES `GC_Inside`.`gc_member` (`member_uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'gell_num, uid => COMPOSITE UNIQUE KEY'

## 2023/03/15 // 심규영 // 갤러리 설정 테이블 수정
CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_gell_setting` (
  `setting_num` INT NOT NULL AUTO_INCREMENT,
  `setting_gell_num` INT NOT NULL,
  `setting_member` TINYINT(1) NOT NULL DEFAULT 0,
  `setting_non_nick` TINYINT(1) NOT NULL DEFAULT 0,
  `setting_article_open_s` TINYINT(1) NOT NULL DEFAULT 0,
  `setting_recommend_standard` TINYINT(3) NOT NULL DEFAULT 10,
  `setting_be_recommend` TINYINT(1) NOT NULL DEFAULT 0,
  `setting_be_recommend_standard` SMALLINT(4) NOT NULL DEFAULT 20,
  `setting_sub_cate` TINYINT(2) NOT NULL DEFAULT 0,
  `setting_basic_cate` TINYINT(1) NOT NULL DEFAULT 0,
  `setting_p_word` TINYINT(1) NOT NULL DEFAULT 0,
  `setting_p_word_list` TEXT NULL DEFAULT NULL,
  `setting_auto_article_delete` TINYINT(1) NOT NULL DEFAULT 0,
  `setting_secret` TINYINT(1) NOT NULL DEFAULT 0,
  `setting_notice` TINYINT(1) NOT NULL DEFAULT 5,
  `setting_fix_s` TINYINT(1) NOT NULL DEFAULT 1,
  `setting_fix_num` TINYINT(1) NOT NULL DEFAULT 3,
  `setting_fix_time` TINYINT(2) NOT NULL DEFAULT 1,
  `setting_adult` TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`setting_num`),
  INDEX `fk_gc_gell_setting_gc_gell1_idx` (`setting_gell_num` ASC),
  CONSTRAINT `fk_gc_gell_setting_gc_gell1`
    FOREIGN KEY (`setting_gell_num`)
    REFERENCES `GC_Inside`.`gc_gell` (`gell_num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

## 갤러리 말머리 테이블
CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_gell_sub_cate` (
  `sub_cate_num` INT NOT NULL AUTO_INCREMENT,
  `sub_cate_gell_num` INT NOT NULL,
  `sub_cate_sequence` INT NOT NULL,
  `sub_cate_name` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`sub_cate_num`),
  INDEX `fk_gc_gell_sub_cate_gc_gell1_idx` (`sub_cate_gell_num` ASC),
  CONSTRAINT `fk_gc_gell_sub_cate_gc_gell1`
    FOREIGN KEY (`sub_cate_gell_num`)
    REFERENCES `GC_Inside`.`gc_gell` (`gell_num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
COMMENT = 'gell_num, sequence => composite unique key'

CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_gell_article` (
  `article_num` INT NOT NULL AUTO_INCREMENT,
  `articlel_gell_num` INT NOT NULL,
  `article_login_status` TINYINT(1) NOT NULL,
  `article_uid` VARCHAR(20) NULL,
  `article_nonmember_uid` VARCHAR(15) NULL,
  `article_nonmember_pass` VARCHAR(255) NULL,
  `article_sub_cate` INT NOT NULL DEFAULT 0,
  `article_title` VARCHAR(100) NOT NULL,
  `article_content` TEXT NOT NULL,
  `article_hit` INT NOT NULL DEFAULT 0,
  `article_comment_count` INT NOT NULL DEFAULT 0,
  `article_recommend_count` INT NOT NULL DEFAULT 0,
  `article_recommend_status` TINYINT NOT NULL COMMENT '갤러리 상태에 따라',
  `article_regip` VARCHAR(100) NOT NULL,
  `article_file` TINYINT NOT NULL DEFAULT 0,
  `article_status` TINYINT NOT NULL DEFAULT 0,
  `article_rdate` DATETIME NOT NULL,
  `article_wdate` DATETIME NULL,
  PRIMARY KEY (`article_num`),
  INDEX `fk_gc_gell_article_gc_gell1_idx` (`articlel_gell_num` ASC),
  INDEX `fk_gc_gell_article_gc_member1_idx` (`article_uid` ASC),
  INDEX `fk_gc_gell_article_gc_gell_sub_cate1_idx` (`article_sub_cate` ASC),
  CONSTRAINT `fk_gc_gell_article_gc_gell1`
    FOREIGN KEY (`articlel_gell_num`)
    REFERENCES `GC_Inside`.`gc_gell` (`gell_num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gc_gell_article_gc_member1`
    FOREIGN KEY (`article_uid`)
    REFERENCES `GC_Inside`.`gc_member` (`member_uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gc_gell_article_gc_gell_sub_cate1`
    FOREIGN KEY (`article_sub_cate`)
    REFERENCES `GC_Inside`.`gc_gell_sub_cate` (`sub_cate_num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_gell_file` (
  `file_num` INT NOT NULL AUTO_INCREMENT,
  `file_article_num` INT NOT NULL,
  `file_ori_name` VARCHAR(255) NOT NULL,
  `file_new_name` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`file_num`),
  INDEX `fk_gc_gell_file_gc_gell_article1_idx` (`file_article_num` ASC),
  CONSTRAINT `fk_gc_gell_file_gc_gell_article1`
    FOREIGN KEY (`file_article_num`)
    REFERENCES `GC_Inside`.`gc_gell_article` (`article_num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = INNODB

## 2023/03/15 // 심규영 // 댓글 삭제 처리자 열 추가
CREATE TABLE `gc_gell_comment` (
	`comment_num` INT(11) NOT NULL AUTO_INCREMENT COMMENT '댓글 번호',
	`comment_article_num` INT(11) NOT NULL COMMENT '게시물 번호',
	`comment_content` VARCHAR(400) NOT NULL COMMENT '댓글 내용' COLLATE 'utf8_general_ci',
	`comment_uid` VARCHAR(20) NOT NULL COMMENT '댓글 작성자' COLLATE 'utf8_general_ci',
	`comment_regip` VARCHAR(100) NOT NULL COMMENT '댓글 작성자 아이피' COLLATE 'utf8_general_ci',
	`comment_re_count` INT(11) NOT NULL DEFAULT '0' COMMENT '댓글 답글 갯수',
	`comment_status` TINYINT(4) NOT NULL DEFAULT '0' COMMENT '댓글 상태//\r\n0:기본//\r\n1:삭제',
	`comment_rdate` DATETIME NOT NULL COMMENT '댓글 작성 날짜',
	`comment_wdate` DATETIME NULL DEFAULT NULL COMMENT '댓글 삭제 날짜',
	`comment_w_uid` VARCHAR(20) NULL DEFAULT NULL COMMENT '댓글 삭제 처리자' COLLATE 'utf8_general_ci',
	PRIMARY KEY (`comment_num`) USING BTREE,
	INDEX `fk_gc_gell_comment_gc_gell_article1_idx` (`comment_article_num`) USING BTREE,
	INDEX `fk_gc_gell_comment_gc_member1_idx` (`comment_uid`) USING BTREE,
	INDEX `comment_w_uid` (`comment_w_uid`) USING BTREE,
	CONSTRAINT `FK_gc_gell_comment_gc_member` FOREIGN KEY (`comment_w_uid`) REFERENCES `gc_member` (`member_uid`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `fk_gc_gell_comment_gc_gell_article1` FOREIGN KEY (`comment_article_num`) REFERENCES `gc_gell_article` (`article_num`) ON UPDATE NO ACTION ON DELETE NO ACTION,
	CONSTRAINT `fk_gc_gell_comment_gc_member1` FOREIGN KEY (`comment_uid`) REFERENCES `gc_member` (`member_uid`) ON UPDATE NO ACTION ON DELETE NO ACTION
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB;

## 2023/03/15 // 심규영 // 댓글 답글 삭제 처리자 열 추가
CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_gell_re_comment` (
  `re_comment_num` INT NOT NULL AUTO_INCREMENT,
  `re_comment_oir_num` INT NOT NULL,
  `re_comment_content` VARCHAR(400) NOT NULL,
  `re_comment_uid` VARCHAR(20) NOT NULL,
  `re_comment_regip` VARCHAR(100) NOT NULL,
  `re_comment_status` TINYINT NOT NULL DEFAULT 0,
  `re_comment_rdate` DATETIME NOT NULL,
  `re_comment_wdate` DATETIME NULL,
  PRIMARY KEY (`re_comment_num`),
  INDEX `fk_gc_gell_re_comment_gc_gell_comment1_idx` (`re_comment_oir_num` ASC),
  INDEX `fk_gc_gell_re_comment_gc_member1_idx` (`re_comment_uid` ASC),
  CONSTRAINT `fk_gc_gell_re_comment_gc_gell_comment1`
    FOREIGN KEY (`re_comment_oir_num`)
    REFERENCES `GC_Inside`.`gc_gell_comment` (`comment_num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gc_gell_re_comment_gc_member1`
    FOREIGN KEY (`re_comment_uid`)
    REFERENCES `GC_Inside`.`gc_member` (`member_uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = INNODB

CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_admin_service_singo` (
  `singo_num` INT NOT NULL AUTO_INCREMENT,
  `singo_type1` TINYINT(1) NOT NULL,
  `singo_type2` TINYINT(2) NOT NULL,
  `singo_type3` TINYINT(1) NOT NULL,
  `singo_uid` VARCHAR(20) NULL,
  `singo_id` VARCHAR(20) NULL,
  `singo_pass` VARCHAR(255) NULL,
  `singo_email` VARCHAR(100) NULL,
  `singo_regip` VARCHAR(100) NOT NULL,
  `singo_gell` VARCHAR(100) NULL,
  `singo_article` VARCHAR(100) NULL,
  `singo_text` TEXT NULL,
  `singo_file` TINYINT(1) NOT NULL,
  `singo_rdate` DATETIME NOT NULL,
  `singo_result_type` TINYINT(1) NOT NULL DEFAULT 0,
  `singo_result_text` TEXT NULL,
  `singo_result_wdate` DATETIME NULL,
  PRIMARY KEY (`singo_num`),
  INDEX `fk_gc_admin_service_singo_gc_member1_idx` (`singo_uid` ASC),
  INDEX `singo_gell_idx` (`singo_gell` ASC),
  CONSTRAINT `fk_gc_admin_service_singo_gc_member1`
    FOREIGN KEY (`singo_uid`)
    REFERENCES `GC_Inside`.`gc_member` (`member_uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `singo_gell`
    FOREIGN KEY (`singo_gell`)
    REFERENCES `GC_Inside`.`gc_gell` (`gell_name`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

## 관리자 갤러리 생성 신청 테이블
CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_admin_gell_create_approve` (
  `gell_create_rdate` DATETIME NOT NULL,
  `gell_create_status` TINYINT(1) NOT NULL DEFAULT 0,
  `gell_create_uid` VARCHAR(20) NOT NULL,
  `gell_create_name` VARCHAR(12) NOT NULL,
  `gell_create_intro` VARCHAR(200) NOT NULL,
  `gell_create_cate` TINYINT NOT NULL,
  `gell_create_address` VARCHAR(20) NOT NULL,
  `gell_create_reason` VARCHAR(100) NOT NULL,
  `gell_create_r_reason` VARCHAR(100) NULL,
  INDEX `fk_gc_admin_gell_create_approve_gc_member1_idx` (`gell_create_uid` ASC),
  INDEX `fk_gc_admin_gell_create_approve_gc_gell_cate21_idx` (`gell_create_cate` ASC),
  CONSTRAINT `fk_gc_admin_gell_create_approve_gc_member1`
    FOREIGN KEY (`gell_create_uid`)
    REFERENCES `GC_Inside`.`gc_member` (`member_uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gc_admin_gell_create_approve_gc_gell_cate21`
    FOREIGN KEY (`gell_create_cate`)
    REFERENCES `GC_Inside`.`gc_gell_cate2` (`gell_cate2`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = INNODB

## 2023/03/15 // 심규영 // 갤러리 차단 목록
CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_gell_block_list` (
  `gell_block_num` INT NOT NULL AUTO_INCREMENT,
  `gell_block_g_num` INT NOT NULL,
  `gell_block_m_uid` VARCHAR(20) NOT NULL,
  `gell_block_uid` VARCHAR(20) NOT NULL,
  `gell_block_reason` VARCHAR(20) NOT NULL,
  `gell_block_date` SMALLINT(3) NOT NULL,
  `gell_block_rdate` DATETIME NOT NULL,
  `gell_block_wdate` DATETIME NOT NULL,
  INDEX `fk_gc_gell_block_list_gc_gell1_idx` (`gell_block_g_num` ASC),
  INDEX `fk_gc_gell_block_list_gc_member1_idx` (`gell_block_m_uid` ASC),
  INDEX `fk_gc_gell_block_list_gc_member2_idx` (`gell_block_uid` ASC),
  PRIMARY KEY (`gell_block_num`),
  CONSTRAINT `fk_gc_gell_block_list_gc_gell1`
    FOREIGN KEY (`gell_block_g_num`)
    REFERENCES `GC_Inside`.`gc_gell` (`gell_num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gc_gell_block_list_gc_member1`
    FOREIGN KEY (`gell_block_m_uid`)
    REFERENCES `GC_Inside`.`gc_member` (`member_uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gc_gell_block_list_gc_member2`
    FOREIGN KEY (`gell_block_uid`)
    REFERENCES `GC_Inside`.`gc_member` (`member_uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = INNODB

## 2023/03/15 // 심규영 // 갤러리 관리 내역
CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_gell_manage_log` (
  `gell_m_l_n` INT NOT NULL AUTO_INCREMENT,
  `gell_m_l_g_n` INT NOT NULL,
  `gell_m_l_uid` VARCHAR(20) NOT NULL,
  `gell_m_l_cate` VARCHAR(20) NOT NULL,
  `gell_m_l_content` VARCHAR(100) NOT NULL,
  `gell_m_l_date` DATETIME NOT NULL,
  INDEX `fk_gc_gell_manage_log_gc_member1_idx` (`gell_m_l_uid` ASC),
  PRIMARY KEY (`gell_m_l_n`),
  CONSTRAINT `fk_gc_gell_manage_log_gc_gell1`
    FOREIGN KEY (`gell_m_l_g_n`)
    REFERENCES `GC_Inside`.`gc_gell` (`gell_num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gc_gell_manage_log_gc_member1`
    FOREIGN KEY (`gell_m_l_uid`)
    REFERENCES `GC_Inside`.`gc_member` (`member_uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = INNODB

## 2023/03/15 // 심규영 // 갤러리 부매니저 권한 테이블 생성
CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_gell_sub_m_power` (
  `sub_m_p_num` INT NOT NULL AUTO_INCREMENT,
  `sub_m_p_g_num` INT NOT NULL,
  `sub_m_p_uid` VARCHAR(20) NOT NULL,
  `sub_m_p_basic` TINYINT(1) NOT NULL,
  `sub_m_p_gell` TINYINT(1) NOT NULL,
  `sub_m_p_ban_list` TINYINT(1) NOT NULL,
  `sub_m_p_delete_list` TINYINT(1) NOT NULL,
  `sub_m_p_log_list` TINYINT(1) NOT NULL,
  `sub_m_p_user_ban` TINYINT(1) NOT NULL,
  `sub_m_p_txt_delete` TINYINT(1) NOT NULL,
  `sub_m_p_command_delete` TINYINT(1) NOT NULL,
  `sub_m_p_coment_delete` TINYINT(1) NOT NULL,
  `sub_m_p_notice` TINYINT(1) NOT NULL,
  `sub_m_p_command` TINYINT(1) NOT NULL,
  `sub_m_p_cate` TINYINT(1) NOT NULL,
  INDEX `fk_gc_gell_sub_m_power_gc_gell1_idx` (`sub_m_p_g_num` ASC),
  INDEX `fk_gc_gell_sub_m_power_gc_member1_idx` (`sub_m_p_uid` ASC),
  PRIMARY KEY (`sub_m_p_num`),
  CONSTRAINT `fk_gc_gell_sub_m_power_gc_gell1`
    FOREIGN KEY (`sub_m_p_g_num`)
    REFERENCES `GC_Inside`.`gc_gell` (`gell_num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gc_gell_sub_m_power_gc_member1`
    FOREIGN KEY (`sub_m_p_uid`)
    REFERENCES `GC_Inside`.`gc_member` (`member_uid`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

## 2023/03/28 // 심규영 // 갤러리 조회수 기록 테이블 생성 쿼리문
CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_gell_hit_log` (
  `hit_gell_num` INT NOT NULL,
  `hit_rdate` DATETIME NOT NULL,
  PRIMARY KEY (`hit_gell_num`),
  INDEX `rdate` (`hit_rdate` DESC),
  CONSTRAINT `fk_gc_gell_hit_log_gc_gell1`
    FOREIGN KEY (`hit_gell_num`)
    REFERENCES `GC_Inside`.`gc_gell` (`gell_num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB


## 2023/04/05 // 심규영 // 게시글 추천 로그 기록 테이블 생성 쿼리문
CREATE TABLE IF NOT EXISTS `GC_Inside`.`gc_gell_recommend_log` (
  `recommend_article_num` INT NOT NULL,
  `recommend_regip` VARCHAR(100) NOT NULL,
  `recommend_rdate` DATE NOT NULL,
  CONSTRAINT `fk_gc_gell_recommend_log_gc_gell_article1`
    FOREIGN KEY (`recommend_article_num`)
    REFERENCES `GC_Inside`.`gc_gell_article` (`article_num`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB