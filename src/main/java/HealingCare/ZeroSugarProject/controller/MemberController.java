package HealingCare.ZeroSugarProject.controller;

import HealingCare.ZeroSugarProject.domain.Member;
import HealingCare.ZeroSugarProject.service.MemberService;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org. springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Controller
public class MemberController {

    private final MemberService memberService;

    @Autowired
    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/members/new")
    public String createForm() {
        return "members/createMemberForm";
    }

   @PostMapping("/members/new")
    public String create(MemberForm form) {
        Member member = new Member();
        member.setName(form.getName());
        member.setAge(form.getAge());
        member.setEndDate(form.getEndDate()); // No need to convert to String here
        member.setRegDate(form.getRegDate()); // No need to convert to String here
        member.setPhoneNumber(form.getPhoneNumber());

        memberService.join(member);

        return "redirect:/members";
    }


    /* 회원 상세정보 조회 */
    @GetMapping("/member/info/{id}")
    public String memberInfoView(@PathVariable("id") Long id, Model model) {
        model.addAttribute("member", memberService.getMemberInfo(id));
        return "members/memberInfoView";
    }


    @GetMapping("/member/delete")
    public String memberDelete(@RequestParam("id") Long id) {
        memberService.memberDelete(id);
        //게시물삭제하고 게시물리스트로 이동
        return "redirect:/members";
    }

    /*회원 수정 */
    @PostMapping("/member/modify/{id}")
    public String memberUpdate(@PathVariable("id") Long id, Member member) {

        Member memberTemp = memberService.getMemberInfo(id);
        memberTemp.setName(member.getName());
        memberTemp.setAge(member.getAge());
        memberTemp.setEndDate(member.getEndDate());
        memberTemp.setRegDate(member.getRegDate());
        memberTemp.setPhoneNumber(member.getPhoneNumber());
        memberService.write(memberTemp);

        //게시물삭제하고 게시물리스트로 이동
        return "redirect:/members";
    }

    /* 현재 날짜 15일 전 회원  리스트 조회  */
    @GetMapping("/members/expireMembers")
    public String expireMembers(Model model) {
        List<Member> members = memberService.findExpireMembersWithin15Days();
        model.addAttribute("member", members);
        return "members/expireMembers";
    }


    @GetMapping("/members")
public String list(Model model) {
    List<Member> members = memberService.findMembers();

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    LocalDate now = LocalDate.now();
    String todayString = now.format(formatter); // 오늘 날짜 String화

    for (Member member : members) {
        // Get the end date from the member
        String endDate = member.getEndDate();

        // Check if endDate is not null
        if (endDate != null) {
            // Parse the end date
            try {
                DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                Date endDateDate = dateFormat.parse(endDate);
                Date todayDate = dateFormat.parse(todayString);

                long diffDay = (endDateDate.getTime() - todayDate.getTime()) / (24 * 60 * 60 * 1000);
                int lastDay = (int) diffDay;
                if (lastDay < 0) {
                    lastDay = 0; // If remaining days is negative, set it to 0
                }

                member.setRemDays(lastDay); // Set the remaining days
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        } else {
            // Handle the case where endDate is null (if needed)
        }
    }

    model.addAttribute("members", members); // Change "member" to "members"
    return "members/memberList";
}
}

//    @GetMapping("/members/expiring-before-15-days")
//    public String getMembersExpiringBefore15Days(Model model) {
//        List<Member> members = findMember15Days.findMembersExpiringBefore15Days();
//        model.addAttribute("members", members);
//        return "members/memberList";
//    }
//
//    @GetMapping("/members/expiring-after-15-days")
//    public String getMembersExpiringAfter15Days(Model model) {
//        List<Member> members = findMember15Days.findMembersExpiringAfter15Days();
//        model.addAttribute("members", members);
//        return "members/memberList";
//    }

