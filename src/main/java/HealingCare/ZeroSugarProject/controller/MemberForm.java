package HealingCare.ZeroSugarProject.controller;

public class MemberForm {
    private String name;
    private String age;
    private String phoneNumber;
    private String regDate;
    private String endDate;
    private int remDays;


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

    public String getEndDate() {
        return endDate;
    }
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
