const cursor = document.querySelector("#cursor");
const cursorCircle = cursor.querySelector(".cursor__circle");

const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
const pos = { x: 0, y: 0 }; // cursor's coordinates
const speed = 0.1; // between 0 and 1

const updateCoordinates = (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
};

window.addEventListener("mousemove", updateCoordinates);

function getAngle(diffX, diffY) {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

function getSqueeze(diffX, diffY) {
  const distance = Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
  const maxSqueeze = 0.15;
  const accelerator = 1500;
  return Math.min(distance / accelerator, maxSqueeze);
}

const updateCursor = () => {
  const diffX = Math.round(mouse.x - pos.x);
  const diffY = Math.round(mouse.y - pos.y);

  pos.x += diffX * speed;
  pos.y += diffY * speed;

  const angle = getAngle(diffX, diffY);
  const squeeze = getSqueeze(diffX, diffY);

  const scale = "scale(" + (1 + squeeze) + ", " + (1 - squeeze) + ")";
  const rotate = "rotate(" + angle + "deg)";
  const translate = "translate3d(" + pos.x + "px ," + pos.y + "px, 0)";

  cursor.style.transform = translate;
  cursorCircle.style.transform = rotate + scale;
};

function loop() {
  updateCursor();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

const cursorModifiers = document.querySelectorAll("[cursor-class]");

cursorModifiers.forEach((curosrModifier) => {
  curosrModifier.addEventListener("mouseenter", function () {
    const className = this.getAttribute("cursor-class");
    cursor.classList.add(className);
  });

  curosrModifier.addEventListener("mouseleave", function () {
    const className = this.getAttribute("cursor-class");
    cursor.classList.remove(className);
  });
});






function sendemail() {
  var userid = "opXca3zh-s4K59SO1"
  emailjs.init(userid);
  var phonenumber = document.getElementById("phonenumber").value;
  var thename = document.getElementById('thename').value;
  var themail = document.getElementById('themail').value;
  var themsg = document.getElementById('themsg').value;
  var validmail = /^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/;

  const form = document.getElementById('my_form');

form.addEventListener('submit', function handleSubmit(event) {
event.preventDefault();

form.reset();
});



  if (thename == "") {
  
    document.getElementById('errorname').innerHTML="Please enter a valid Name";  
    setTimeout(() => {
      const box = document.getElementById('errorname');
      box.style.opacity = 0;
    }, 10000);
  }
  else if (themail == "" || themail.match(!validmail)) {
  
  }

  else if (phonenumber == '' ) {
  
  }
  else {
    var contactdetail = {
      from_name: thename,
      from_number:phonenumber,
      from_email: themail,
      message: themsg
    };

    emailjs.send('service_8vyq8ok', 'template_w1laus3', contactdetail).then(function (res) {
  alert('your mail has been recieved, our team will reach out to you 😉')
    },
      reason => {
        alert("Error Occur");
      })
  }
}
