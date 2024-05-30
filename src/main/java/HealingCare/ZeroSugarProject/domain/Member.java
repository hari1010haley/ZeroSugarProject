package HealingCare.ZeroSugarProject.domain;


import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String age;

    private String phoneNumber;

    private String regDate;

    private String endDate;

    @Column(name = "rem_days") // 데이터베이스 테이블의 컬럼명과 매핑
    private int remDays;


    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getAge() {
        return age;
    }
    public void setAge(String age) {
        this.age = age;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getRegDate() {
        return regDate;
    }
    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }

    public String getEndDate() {return endDate;}
    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public int getRemDays() {
        return remDays;
    }
    public void setRemDays(int remDays) {
        this.remDays = remDays;
    }
}
