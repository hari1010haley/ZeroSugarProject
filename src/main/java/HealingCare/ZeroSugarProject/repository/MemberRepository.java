package HealingCare.ZeroSugarProject.repository;

import HealingCare.ZeroSugarProject.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface MemberRepository extends JpaRepository<Member, Long> {
    Member save(Member member);
    Optional<Member> findById(Long id);
    Optional<Member> findByName(String name);
    List<Member> findAll();
    List<Member> findAllByRemDaysIsGreaterThanEqualAndRemDaysIsLessThanEqual(int greaterThanEqul, int lessThanEqual);
}


    //List<Member> findByExpiryDateBefore(LocalDate expiryDate);
    //List<Member> findByExpiryDateAfter(LocalDate expiryDate);

