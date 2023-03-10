package kr.co.gcInside.repository;

import kr.co.gcInside.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;


public interface UserRepo extends JpaRepository<UserEntity, String> {
}
