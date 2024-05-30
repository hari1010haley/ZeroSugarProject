package HealingCare.ZeroSugarProject.repository;

import HealingCare.ZeroSugarProject.domain.Member;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Repository;
import java.util.*;



@Repository
public abstract class MemoryMemberRepository implements MemberRepository {

    private static Map<Long, Member> store= new HashMap<>();
    private static long sequence = 0L;


    @Override
    public Member save(Member member) {
        member.setId(++sequence);
         store.put(member.getId(), member);
         return member;
    }


    @Override
    public Optional<Member> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }


    @Override
    public List<Member> findAll() {
        return new ArrayList<>(store.values());
    }

    @Override
    public Optional<Member> findByName(String name) {
        return store.values().stream()
                 .filter(member -> member.getName().equals(name))
                 .findAny();
    }

    public void clearStore(){
        store.clear();
    }

    @Override
    public <S extends Member> List<S> findAll(Example<S> example) {
        return List.of();
    }
}
