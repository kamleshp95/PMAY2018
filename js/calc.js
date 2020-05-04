jQuery(document).ready(function ($) {
  var defaultLoan = 1500000;
  var minLoan = 500000;
  var maxLoan = 30000000;
  var defaultTenure = 240;
  var minTenure = 36;
  var maxTenure = 360;
  var defaultFamilyIncome = 1800000;
  var minFamilyIncome = 1000;
  var maxFamilyIncome = 1800000;
  $("#family-income").on("change", function () {
    var val = removeSpecialChars($(this).val()) * 1;
    if (
      val.length == 0 ||
      isNaN(val) ||
      val < minFamilyIncome ||
      val > maxFamilyIncome
    ) {
      alert(
        "Please enter a valid number between " +
          minFamilyIncome +
          " and " +
          maxFamilyIncome
      );
      $(this).val(inrFormat(defaultFamilyIncome, 0));
      return false;
    }
    $("#slider-family-income").slider("value", val);
    $("#family-income").val(inrFormat(val, 0));
    calculate(0);
  });
  $("#loan-tenure").on("change", function () {
    var irval = $(this).val();
    if (
      irval.length == 0 ||
      isNaN(irval) ||
      irval < minTenure ||
      irval > maxTenure
    ) {
      alert(
        "Please enter a valid number between " + minTenure + " and " + maxTenure
      );
      $(this).val(240);
      return false;
    }
    $("#slider-tenure").slider("value", irval);
    $("#loan-tenure").val(irval);
    calculate(0);
  });
  $("#carpet-area").on("change", function () {
    var irval = $(this).val();
    if (irval.length == 0 || isNaN(irval) || irval < 10 || irval > 2000) {
      alert("Please enter a valid number");
      $(this).val(50);
      return false;
    }
    calculate(0);
  });

  $("#loan-amount").on("change", function () {
    var irval = removeSpecialChars($(this).val()) * 1;
    if (
      irval.length == 0 ||
      isNaN(irval) ||
      irval < minLoan ||
      irval > maxLoan
    ) {
      alert(
        "Please enter a valid number between " + minLoan + " and " + maxLoan
      );
      $(this).val(inrFormat(defaultLoan, 0));
      return false;
    }
    $("#slider-loan-price").slider("value", irval);
    $(this).val(inrFormat(irval, 0));
    calculate(0);
  });
  /*Desktop*/
  $("#slider-family-income").slider({
    range: "min",
    value: defaultFamilyIncome,
    min: minFamilyIncome,
    max: maxFamilyIncome,
    step: 1000,
    create: function () {
      var sliderVal = $(this).slider("value");
      $("#family-income").val(inrFormat(sliderVal, 0));
      calculate(0);
    },
    slide: function (event, ui) {
      var sliderVal = ui.value;
      $("#family-income").val(inrFormat(sliderVal, 0));
      calculate(0);
    },
  });
  /*ROI SLIDER*/
  $("#slider-loan-price").slider({
    range: "min",
    value: defaultLoan,
    min: minLoan,
    max: maxLoan,
    step: 10000,
    create: function () {
      var sliderVal = $(this).slider("value");
      // handle.html( "<span>"+inrFormat(sliderVal,true)+"</span>");
      $("#loan-amount").val(inrFormat(sliderVal, 0));
      calculate(0);
    },
    slide: function (event, ui) {
      var sliderVal = ui.value;
      // handle.html("<span class='moving'>"+inrFormat(sliderVal,true)+"</span>" );
      $("#loan-amount").val(inrFormat(sliderVal, 0));
      calculate(0);
    },
  });

  $("#slider-tenure").slider({
    range: "min",
    value: defaultTenure,
    min: minTenure,
    max: maxTenure,
    step: 1,
    create: function () {
      var sliderVal = $(this).slider("value");
      // handle.html( "<span>"+inrFormat(sliderVal,true)+"</span>");
      $("#loan-tenure").val(inrFormat(sliderVal));
      calculate(0);
    },
    slide: function (event, ui) {
      var sliderVal = ui.value;
      // handle.html("<span class='moving'>"+inrFormat(sliderVal,true)+"</span>" );
      $("#loan-tenure").val(sliderVal);
      calculate(0);
    },
  });
  $(document).delegate(".ui-page", "touchmove", false);
  $(".first_pucca,.womeninhouse_property,.womeninhouse").on(
    "change",
    function () {
      calculate(0);
    }
  );
  $(".womeninhouse").on("change", function () {
    if ($(".womeninhouse:checked").val() == "No") {
      $(".women-property").stop().show();
    } else {
      $(".women-property").stop().hide();
    }
  });
});
function removeSpecialChars(a) {
  return (
    (a = a.replace(" ", "")),
    (a = a.replace(" ", "")),
    (a = a.replace("INR", "")),
    (a = a.replace(/[^\w\s]/gi, "")),
    (a = a.replace(/[A-Za-z$-]/g, ""))
  );
}
function inrFormat(a, sy) {
  if (sy) {
    csy = "<em><i class='fa fa-inr' aria-hidden='true'></i></em> ";
  } else {
    csy = "";
  }
  (a += ""),
    (x = a.split(".")),
    (x1 = x[0]),
    (x2 = x.length > 1 ? "." + x[1] : "");
  for (
    var c = /(\d+)(\d{3})/,
      d = 0,
      e = String(x1).length,
      f = parseInt(e / 2 - 1);
    c.test(x1) &&
    (d > 0
      ? (x1 = x1.replace(c, "$1,$2"))
      : ((x1 = x1.replace(c, "$1,$2")), (c = /(\d+)(\d{2})/)),
    d++,
    f--,
    0 != f);

  );
  return csy + "" + x1 + x2;
}

function calculate(annualIncome) {
  if (annualIncome == 0)
    annualIncome = removeSpecialChars($("#family-income").val());
  var loanAmountDiv = removeSpecialChars($("#loan-amount").val());
  var required_tenure = removeSpecialChars($("#loan-tenure").val());
  var puccaHouse = $("input[name=first_pucca]:checked").val();
  var isWomenProperty = $("input[name=womeninhouse_property]:checked").val();
  var isWomen = $("input[name=womeninhouse]:checked").val();
  var carpetArea = $("#carpet-area").val();
  var carpetAreaDiv = $(".sq-ft-area");
  var schemeDiv = $(".totalamount-saved.gray");

  if (puccaHouse === "Yes") {
    /* if yes--> display Type of Scheme */
    $(".totalamount-saved.gray").parents("li:first").removeClass("not-visible");
    if (annualIncome <= 600000) {
      /* // EWS/LIG */
      var typeOfScheme = "EWS/LIG";
    } else if (annualIncome <= 1200000) {
      var typeOfScheme = "MIG-I";
    } else if (annualIncome <= 1800000) {
      var typeOfScheme = "MIG-II";
    } else if (annualIncome > 1800000) {
      // display error msg -->Your Are not eligible in PMAY Scheme
      var typeOfScheme = "Not Eligible in PMAY";
      schemeDiv.html(typeOfScheme);
      $(".totalamount-saved.maroon").html("Not Applicable");
      schemerMapper("");
      return false;
      //alert("Your Are not eligible in PMAY Scheme : Annual Income more 18 Lacs");
    } else {
      var typeOfScheme = "Not Eligible in PMAY";
      schemeDiv.html(typeOfScheme);
      $(".totalamount-saved.maroon").html("Not Applicable");
      schemerMapper("");
      return false;
    }
    schemeDiv.html(typeOfScheme);
    if (typeOfScheme === "MIG-I" || typeOfScheme === "MIG-II") {
      // if true display carpet area
      carpetAreaDiv.stop().show();
      // hide--> Is Women there in the property
      $(".women-property").stop().hide();
      $(".women-property-owner").stop().hide();
      //  $(".add-padding").css("margin-top",135);
      // display--> Loan Amount You Require
      if (carpetArea <= 160 && annualIncome <= 1200000) {
        calculateSubsidy(); //  function call to calculate subsidy
      } else if (carpetArea <= 200 && annualIncome <= 1800000) {
        calculateSubsidy(); //  function call to calculate subsidy
      } else {
        schemeDiv.html("Not Eligible in PMAY");
        $(".totalamount-saved.maroon").html("Not Applicable");
        schemerMapper("");
        return false;
      }
    } else if (typeOfScheme === "EWS/LIG") {
      carpetAreaDiv.hide();
      // display--> Is Women there in the property
      $(".women-property-owner").stop().show();
      if (isWomenProperty == "No") {
        calculateSubsidy();
        return false;
      }
      if (isWomen == "No") {
        schemeDiv.html("Not Eligible in PMAY");
        $(".totalamount-saved.maroon").html("Not Applicable");
        schemerMapper("");
        return false;
      }
      /*schemeDiv.html('Not Eligible in PMAY');
            $(".totalamount-saved.maroon").html('Not Applicable');
            return false;*/
      //$(".add-padding").css("margin-top",120);
      //  function call to calculate subsidy
    }
    if (typeOfScheme == "MIG-I") {
      if (carpetArea <= 160) {
        loanAmountDiv.stop().show();
        /*if(isWomen=='No'){
            schemeDiv.html('Not Eligible in PMAY');
            $(".totalamount-saved.maroon").html('Not Applicable');
            return false;
          }   */
      } else {
        schemeDiv.html("Not Eligible in PMAY");
        $(".totalamount-saved.maroon").html("Not Applicable");
        schemerMapper("");
        return false;
      }
    }
  } else if (puccaHouse === "No") {
    /* if no --> do not display Type of Scheme */
    schemeDiv.html("Not Eligible in PMAY");
    $(".totalamount-saved.maroon").html("Not Applicable");
    schemerMapper("");
    return false;
    if (annualIncome <= 600000) {
      //alert("annualIncome <= 600000 hide carpet area : "+annualIncome);
      carpetAreaDiv.stop().hide();
    } else {
      carpetAreaDiv.stop().show();
    }
    //$('.totalamount-saved.gray').parents("li:first").addClass("not-visible");

    if (carpetArea <= 160) {
      loanAmountDiv.stop().show();
    } else {
      schemeDiv.html("Not Eligible in PMAY");
      $(".totalamount-saved.maroon").html("Not Applicable");
      schemerMapper("");
      return false;
    }
    calculateSubsidy();
  }
  schemerMapper(typeOfScheme);
}
function schemerMapper(typeOfScheme) {
  var tagline = "";
  //console.log(typeOfScheme);
  switch (typeOfScheme) {
    case "MIG-I":
      $(".tag-line").stop().show();
      tagline = "Middle Income Group - I";
      break;
    case "EWS/LIG":
      $(".tag-line").stop().show();
      tagline = "Economical Weaker Section/Lower Income Group";
      break;
    case "MIG-II":
      $(".tag-line").stop().show();
      tagline = "Middle Income Group - II";
      break;
    default:
      $(".tag-line").stop().hide();
      tagline = "";
      break;
  }
  $(".tag-line").html(tagline);
}
function calculateSubsidy() {
  loanAmount = removeSpecialChars($("#loan-amount").val());
  var loanAmountDiv = $("#loan-amount");
  var tenure = removeSpecialChars($("#loan-tenure").val());
  var puccaHouse = $("input[name=first_pucca]:checked").val();
  var isWomenProperty = $("input[name=womeninhouse_property]:checked").val();
  var isWomen = $("input[name=womeninhouse]:checked").val();
  var carpetArea = $("#carpet-area").val();
  var carpetAreaDiv = $("#carpet-area");
  var schemeDiv = $(".totalamount-saved.gray");
  var typeOfScheme = $(".totalamount-saved.gray").html();
  var minews = 600000;
  var minmig1 = 900000;
  var minmig2 = 1200000;
  var N = Math.min(240, tenure); // N--> tenure
  var Loan = 0;
  var ROI = 0;
  if (typeOfScheme === "EWS/LIG") {
    Loan = Math.min(minews, loanAmount);
    ROI = 6.5;
  } else if (typeOfScheme === "MIG-I") {
    Loan = Math.min(minmig1, loanAmount);
    ROI = 4;
  } else if (typeOfScheme === "MIG-II") {
    Loan = Math.min(minmig2, loanAmount);
    ROI = 3;
  }
  schemerMapper(typeOfScheme);
  var EMI = (Loan * (ROI / 1200)) / (1 - Math.pow(1 / (1 + ROI / 1200), N));
  var Counter = 1;
  var ost = Loan;
  var Finalnpv = 0;
  for (; N >= Counter; ) {
    var intforthemonth = (ost * ROI) / 1200;
    var balprin = EMI - intforthemonth;
    var ost = ost - balprin;
    var NPV = intforthemonth / Math.pow(1 + 9 / 1200, Counter);
    Finalnpv = Finalnpv + NPV;
    Counter = Counter + 1;
  }
  Finalnpv = Math.round(Finalnpv);
  if (Finalnpv != null) {
    $(".totalamount-saved.maroon").html(inrFormat(Finalnpv, 1));
  } else {
    $(".totalamount-saved.maroon").html("Not Applicable");
    schemerMapper("");
  }
}