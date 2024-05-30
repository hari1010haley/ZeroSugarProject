package HealingCare.ZeroSugarProject.service;

import HealingCare.ZeroSugarProject.aop.TimeTraceAop;
import HealingCare.ZeroSugarProject.repository.*;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import javax.sql.DataSource;

@Configuration
public class SpringConfig {

    private final MemberRepository memberRepository;


    @Autowired
    public SpringConfig(@Qualifier("springDataJpaMemberRepository") MemberRepository memberRepository) {
        this.memberRepository = memberRepository;

    }

    @Bean
    public MemberService memberService() {
        return new MemberService(memberRepository);
    }

    @Configuration
    public class WebConfig {

        @Bean
        public WebMvcConfigurer corsConfigurer() {
            return new WebMvcConfigurer() {
                @Override
                public void addCorsMappings(CorsRegistry registry) {
                    registry.addMapping("/**").allowedOrigins("http://localhost:3000");
                }
            };
        }
    }
}

//    @Bean
//    public TimeTraceAop timeTraceAop(){
//        return new TimeTraceAop();
//    }

//    @Bean
//    public MemberRepository memberRepository() {
////        return new JdbcMemberRepository(dataSource);
//        return new JpaMemberRepository(em);
//    }

