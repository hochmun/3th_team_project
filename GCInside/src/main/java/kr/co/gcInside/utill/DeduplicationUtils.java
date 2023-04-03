package kr.co.gcInside.utill;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.function.Predicate;

/**
 * 2023/04/01 // 심규영 // stream filter 중복 제거 유틸
 *      사용법
 *          List<VO> distinctVos = vos.stream().filter(distinctByKey(vo::vo_num)).collerct(Collectors.toList());
 *
 */
public class DeduplicationUtils {

    public static <T> Predicate<T> distinctByKey(Function<? super T, Object> keyExtractor) {
        Map<Object, Boolean> seen = new ConcurrentHashMap<>();
        return t -> seen.putIfAbsent(keyExtractor.apply(t), Boolean.TRUE) == null;
    }

}
