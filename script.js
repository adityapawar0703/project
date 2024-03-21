function locomotive(){
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
// locomotive()


// gsap.from("#page1 h1",{
//   y:600,
//   duration:1,
//   dealy:0.5,
//   stagger:0.2,
// })

var page1text = document.querySelectorAll(".page1-text h1")
page1text.forEach(function(elem){
    var splited = elem.textContent.split("")
    var clutter  = ""
    splited.forEach(function(val){
      clutter += `<span>${val}</span>` 
    })
  
    // document.querySelector(".page1-text h1").innerHTML = clutter
    elem.innerHTML = clutter
})

gsap.from(".page1-text h1 span",{
    
    duration:1,
    stagger:0.1,
    y:600,
    // rotate:20,
  
})



var crsr = document.querySelector("#cursor")

document.addEventListener("mousemove", function (dets) {
    gsap.to(crsr, {
        x: dets.x,
        y: dets.y
    })
})

var card = document.querySelectorAll("#card-img")
var text = ""
card.forEach(function(val){
 
   
  val.addEventListener("mouseenter",function(){
   text= val.getAttribute("data-text")
   crsr.style.width = "250px"
   crsr.style.height = "30px"
   crsr.style.borderRadius = "20px"
      crsr.innerHTML = `<h5>${text}</h5> <h5>${text}</h5> <h5>${text}</h5>`
  })
  val.addEventListener("mouseleave",function(){
    crsr.style.width = "20px"
    crsr.style.height = "20px"
    crsr.style.borderRadius = "50%"
       crsr.innerHTML = ""
     
   })
})

var elementcontainer = document.querySelector("#element-container")
var movingImagediv = document.querySelector("#moving-image")

elementcontainer.addEventListener("mouseenter",function(){
  movingImagediv.style.opacity = 1;
})

elementcontainer.addEventListener("mouseleave",function(){
  movingImagediv.style.opacity = 0;
})
 
allElements = document.querySelectorAll(".element")
var moveimg = document.querySelector("#moving-image img")

allElements.forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    var answer = elem.getAttribute("data-image")
    gsap.to(moveimg, {
      attr: { src: answer },
      duration: 0.3,
    })
  })
  elementcontainer.addEventListener("mousemove",function(dets){
    gsap.to(movingImagediv,{
      left:`${dets.x - elementcontainer.getBoundingClientRect().x}`,
      top:`${dets.y - elementcontainer.getBoundingClientRect().y - 180}`,
      duration:2,
      ease:"power1.out"
    })
  })
})


//  string funtion 
mypath = `M 200 200 Q 700 200 1600 200`
finalpath = `M 200 200 Q 700 200 1600 200`
 string = document.querySelector("#string")
 string.addEventListener("mousemove",function(dets){
  mypath = `M 200 200 Q ${dets.x} ${dets.y - 152} 1600 200`
 console.log(dets.y)
  gsap.to("svg path",{
   attr:{d: mypath},
  })
 })

 string.addEventListener("mouseleave",function(){
  gsap.to("svg path",{
     attr:{d:finalpath},
     ease: "elastic.out(1,0.2)",
     duration:1,
  })
 })



// var abcd = string.getBoundingClientRect()
// console.log(abcd)

