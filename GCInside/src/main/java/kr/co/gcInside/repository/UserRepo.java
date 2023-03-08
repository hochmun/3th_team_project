package kr.co.gcInside.repository;

import kr.co.gcInside.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<UserEntity, String> {
}
