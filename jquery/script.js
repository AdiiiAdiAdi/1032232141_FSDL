// ------------- Helper: trim and empty check -------------
function isEmpty(value) {
    return value.trim().length === 0;
  }
  
  // ------------- Form Validation -------------
  function validateForm(event) {
    event.preventDefault(); // prevent default submit
  
    // Access elements using DOM methods
    var usernameEl = document.getElementById("username");
    var emailEl = document.getElementById("email");
    var phoneEl = document.getElementById("phone");
    var passwordEl = document.getElementById("password");
    var confirmPasswordEl = document.getElementById("confirmPassword");
  
    var username = usernameEl.value;
    var email = emailEl.value;
    var phone = phoneEl.value;
    var password = passwordEl.value;
    var confirmPassword = confirmPasswordEl.value;
  
    var isValid = true;
  
    // Clear previous errors
    document.getElementById("usernameError").innerHTML = "";
    document.getElementById("emailError").innerHTML = "";
    document.getElementById("phoneError").innerHTML = "";
    document.getElementById("passwordError").innerHTML = "";
    document.getElementById("confirmPasswordError").innerHTML = "";
  
    // 1) Fields should not be empty (spaces count as empty)
    if (isEmpty(username)) {
      document.getElementById("usernameError").innerHTML =
        "Username should not be empty.";
      isValid = false;
    }
  
    if (isEmpty(email)) {
      document.getElementById("emailError").innerHTML =
        "Email should not be empty.";
      isValid = false;
    }
  
    if (isEmpty(phone)) {
      document.getElementById("phoneError").innerHTML =
        "Phone number should not be empty.";
      isValid = false;
    }
  
    if (isEmpty(password)) {
      document.getElementById("passwordError").innerHTML =
        "Password should not be empty.";
      isValid = false;
    }
  
    if (isEmpty(confirmPassword)) {
      document.getElementById("confirmPasswordError").innerHTML =
        "Please confirm your password.";
      isValid = false;
    }
  
    // 2) Phone: only numeric, exactly 10 digits
    var phoneRegex = /^[0-9]{10}$/;
    if (!isEmpty(phone) && !phoneRegex.test(phone)) {
      document.getElementById("phoneError").innerHTML =
        "Phone number must be 10 digits (numeric only).";
      isValid = false;
    }
  
    // 3) Password length >=7; at least one capital letter, one digit,
    // and one special character from (&,$,#,@)
    // Regex explanation:
    // (?=.*[A-Z])   -> at least one uppercase
    // (?=.*[0-9])   -> at least one digit
    // (?=.*[&$#@])  -> at least one of the given special chars
    // .{7,}         -> length at least 7
    var passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[&$#@]).{7,}$/;
    if (!isEmpty(password) && !passwordRegex.test(password)) {
      document.getElementById("passwordError").innerHTML =
        "Password must be at least 7 characters, contain one uppercase letter, one digit, and one of (&,$,#,@).";
      isValid = false;
    }
  
    // 4) Password and Confirm Password must match
    if (!isEmpty(password) && !isEmpty(confirmPassword) &&
        password !== confirmPassword) {
      document.getElementById("confirmPasswordError").innerHTML =
        "Passwords do not match.";
      isValid = false;
    }
  
    // 5) Email validation using regular expression:
    // - Few letters before @ (at least 2): [A-Za-z]{2,}
    // - Exactly 3 letters between @ and . : @[A-Za-z]{3}\.
    // - 2 or 3 letters after . : \.[A-Za-z]{2,3}
    var emailRegex = /^[A-Za-z]{2,}[A-Za-z0-9._]*@[A-Za-z]{3}\.[A-Za-z]{2,3}$/;
    if (!isEmpty(email) && !emailRegex.test(email)) {
      document.getElementById("emailError").innerHTML =
        "Email must be of form: letters@xxx.xx or letters@xxx.xxx";
      isValid = false;
    }
  
    if (isValid) {
      alert("Registration successful!");
      document.getElementById("registrationForm").reset();
    }
  }
  
  // Restrict phone field to numeric values only as user types
  function restrictPhoneToDigits() {
    var phoneEl = document.getElementById("phone");
    phoneEl.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "").slice(0, 10);
    });
  }
  
  // ------------- DOM Manipulation Demo (using plain JS) -------------
  function setupDomDemo() {
    var changeTextBtn = document.getElementById("changeTextBtn");
    var moveTitleBtn = document.getElementById("moveTitleBtn");
    var changeImageBtn = document.getElementById("changeImageBtn");
    var addNodeBtn = document.getElementById("addNodeBtn");
    var deleteNodeBtn = document.getElementById("deleteNodeBtn");
  
    // Change text using innerHTML and access via getElementsByTagName/getElementsByClassName
    changeTextBtn.addEventListener("click", function () {
      // getElementsByTagName
      var paragraphs = document.getElementsByTagName("p");
      if (paragraphs.length > 0) {
        paragraphs[0].innerHTML =
          "Paragraph text changed using <strong>innerHTML</strong> and getElementsByTagName.";
      }
  
      // getElementsByClassName
      var infoElements = document.getElementsByClassName("info");
      if (infoElements.length > 0) {
        infoElements[0].style.color = "darkgreen";
        infoElements[0].style.fontWeight = "bold";
      }
    });
  
    // Change CSS properties like color and position of a particular element
    var moved = false;
    moveTitleBtn.addEventListener("click", function () {
      var title = document.getElementById("domTitle");
      title.style.position = "relative";
      title.style.color = moved ? "#1e3c72" : "#ff6600";
      title.style.left = moved ? "0px" : "40px";
      title.style.top = moved ? "0px" : "10px";
      moved = !moved;
    });
  
    // Change the image source after clicking a button
  var images = ["images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg", "images/5.jpg"];
  var currentImageIndex = 0;
    changeImageBtn.addEventListener("click", function () {
      var img = document.getElementById("demoImage");
    currentImageIndex = (currentImageIndex + 1) % images.length;
    img.src = images[currentImageIndex];
    });
  
    // Add a text node and attach it to a parent node
    addNodeBtn.addEventListener("click", function () {
      var notesContainer = document.getElementById("notesContainer");
      var newParagraph = document.createElement("p");
      var textNode = document.createTextNode(
        "This is a dynamically added note using createTextNode."
      );
      newParagraph.appendChild(textNode);
      notesContainer.appendChild(newParagraph);
    });
  
    // Delete a node (delete last child in notesContainer)
    deleteNodeBtn.addEventListener("click", function () {
      var notesContainer = document.getElementById("notesContainer");
      if (notesContainer.lastChild) {
        notesContainer.removeChild(notesContainer.lastChild);
      }
    });
  }
  
  // ------------- jQuery Operations -------------
  function setupJQueryFeatures() {
    // Change button text using jQuery
    $("#jqButton").on("click", function () {
      $(this).text("Button text changed using jQuery!");
    });
  
    // Set background-image using jQuery CSS property
    $("body").css(
      "background-image",
    'url("images/5.jpg")'
    );
    $("body").css("background-size", "cover");
  $("body").css("background-position", "center");
  $("body").css("background-repeat", "no-repeat");
  
    // Access HTML form data using jQuery
    $("#showFormDataBtn").on("click", function () {
      var u = $("#username").val();
      var e = $("#email").val();
      var p = $("#phone").val();
      var msg =
        "Form data (via jQuery):\n" +
        "Username: " +
        u +
        "\nEmail: " +
        e +
        "\nPhone: " +
        p;
      alert(msg);
    });
  
    // Add attribute using jQuery (e.g., add title and maxlength to phone)
    $("#phone").attr("maxlength", "10");
    $("#phone").attr("title", "Enter 10 digit phone number (numeric only).");
  }
  
  // ------------- Initialization -------------
  document.addEventListener("DOMContentLoaded", function () {
    document
      .getElementById("registrationForm")
      .addEventListener("submit", validateForm);
  
    restrictPhoneToDigits();
  setupTabs();
    setupDomDemo();
    setupJQueryFeatures();
  });

// ------------- Tabs (Form / DOM+jQuery) -------------
function setupTabs() {
  var tabFormBtn = document.getElementById("tabFormBtn");
  var tabDomBtn = document.getElementById("tabDomBtn");
  var tabFormPanel = document.getElementById("tabFormPanel");
  var tabDomPanel = document.getElementById("tabDomPanel");

  function activateTab(tabName) {
    var isForm = tabName === "form";

    tabFormBtn.classList.toggle("active", isForm);
    tabDomBtn.classList.toggle("active", !isForm);

    tabFormBtn.setAttribute("aria-selected", isForm ? "true" : "false");
    tabDomBtn.setAttribute("aria-selected", !isForm ? "true" : "false");

    tabFormPanel.classList.toggle("active", isForm);
    tabDomPanel.classList.toggle("active", !isForm);
  }

  tabFormBtn.addEventListener("click", function () {
    activateTab("form");
  });

  tabDomBtn.addEventListener("click", function () {
    activateTab("dom");
  });
}