<template>
  <!--问答详情页 -->
  <el-row class="question-detail">
    <el-col :span="18">
        <div class="qa-area">
          <el-row  style="border-bottom: 1px solid #e4e6e8;">  
            <h1 itemprop="name" style="0 0 10px;" class="grid--cell fs-headline1 fl1 ow-break-word"><a href="/questions/54979667/how-do-i-replace-the-commas-in-my-string-without-affecting-the-commas-in-my-csv" class="question-hyperlink"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">如何在不影响CSV文件中的逗号的情况下替换字符串中的逗号？</font></font></a></h1>
          </el-row>
          <el-row style="background-color:red"> 
            I have a data set which I'm loading with strings and it contains something like this:
              "10, 14, 15, "20,152", 37, "42,167", 22"
              How can I use Java to parse the data so that the commas inside the quotation marks are safely removed and the other commas are not affected?
          </el-row>

           <el-row style="background-color:red"> 
              1答案
          </el-row>
         
        </div>
         

         <div class="answer-area">
          <el-row style="background-color:black">  
            试试这个：
          </el-row>
          <el-row style="background-color:red"> 
              <code>
                import java.util.ArrayList;

public class Main {

    public static void main(String args[]) {
        String input = "'10,11', '12,14', 15, '20,152', 37, '42,167', 22"; //
        String[] list = input.split("'"); // Split the string using "'" as delimeter(change it to quotation mark)
        ArrayLis elements = new ArrayList();
        for (int i = 0; i  list.length; i++) {
                        // condition to check if it is outside/outside the quotation mark
            if (i % 2 != 0) {  // if inside a quotation mark
                if (!list[i].trim().isEmpty()) { // so that spaces will not be included
                    elements.add(list[i].trim()); // add the element to the list
                }
            } else { //if outside the quotation marks
                String[] tmp = list[i].split(","); // split the regular comma separated values
                for (String s : tmp) { // iterate each splits
                    if (!s.trim().isEmpty()) { // check for spaces
                        elements.add(s.trim()); // add element to the list
                    }
                }
            }
        }

        for (String s : elements) {
            System.out.println(s);
        }
    }

}
              </code>
          </el-row>
        </div>

    </el-col>
    <el-col :span="6">&nbsp;</el-col>
  </el-row>
</template>

<script>
import { mapState } from 'vuex'
import { isBrowser } from '~/environment/esm'
import lozad from '~/plugins/lozad'
import marked from '~/plugins/marked'
import adConfig from '~/config/ad.config'
import ShareBox from '~/components/widget/share'
export default {
  name: 'question-detail',
  components: {
    ShareBox
  },
  fetch({ store }) {
    return store.dispatch('events/fetchEvents')
  },
  computed: {
    comments() {
      return this.$store.state.events.events.data
    },
    isEnLang() {
      return this.$store.getters['global/isEnLang']
    },
    isMobile() {
      return this.$store.state.global.isMobile
    }
  }
}
</script>

<style lang="scss" scoped>

</style>