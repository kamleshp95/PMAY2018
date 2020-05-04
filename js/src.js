$(document).ready(function () {
  $("#navId a").click((e) => {
    e.preventDefault();
    $(this).tab("show");
  });

  $("#pmay_login_form").on("submit", function (e) {
    e.preventDefault();
    var name = $("#email").val();
    var pass = $("#password").val();
    // console.log(`12${name}+ ${pass}`);

    if (name === "abc@test.com" && pass === "1234") {
      // alert("Succes");
      window.location.href = "after_login.html";
    }
  });

  $("#quiz_form").on("submit", function (e) {
    e.preventDefault();
    $(".pmay_quiz_result").hide();
    if (
      this.answer1.value === "" ||
      this.answer2.value === "" ||
      this.answer3.value === "" ||
      this.answer4.value === "" ||
      this.answer5.value === "" ||
      this.answer6.value === ""
    ) {
      alert("कृपया सर्व प्रश्नांची उत्तरे द्या.");
    } else {
      total = 0;
      right_ans = [1, 2, 3, 4, 1, 2];
      ans = [
        +this.answer1.value,
        +this.answer2.value,
        +this.answer3.value,
        +this.answer4.value,
        +this.answer5.value,
        +this.answer6.value,
      ];
      for (let i = 0; i < 6; i++) {
        if (right_ans[i] === ans[i]) {
          total++;
        }
      }
      console.log(this.answer1.value);
      console.log(this.answer2.value);
      console.log(this.answer3.value);
      console.log(this.answer4.value);
      console.log(this.answer5.value);
      console.log(this.answer6.value);
      console.log(right_ans);
      console.log(ans);
      console.log(total);
      $(".q_re_score").text(`${total}/6`);
      if (total >= 4) {
        $("#quiz_passed").show();
      } else {
        $("#quiz_failed").show();
        // $("#quiz_failed").removeClass("d-none");
      }
      this.reset();
    }
  });
});
