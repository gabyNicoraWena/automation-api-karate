package karate;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class KarateRunner {

    @Test
    void testParallel() {
        String tags= "";
        if(System.getProperty("Karate.options")== null || System.getProperty("Karate.options").isEmpty()){
           tags = "~@ignore";
        } else {
           tags = System.getProperty("Karate.options"); 
        }
        Results results = Runner.path("classpath:karate")
                .tags(tags)
                .outputCucumberJson(true)
                .outputJunitXml(true)
                .parallel(5);
        assertEquals(0, results.getFailCount(), results.getErrorMessages());
    }

}
