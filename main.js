function startclassification() {
    navigator.mediaDevices.getUserMedia({
        audio: true
    })
    classifier = ml5.soundClassifier("https://teachablemachine.withgoogle.com/models/J6QV_EyaS/model.json", {
        probabilityThreshold: 0.7
    }, modelReady)
}

function modelReady() {
    classifier.classify(gotresults)
}
var dog = 0
var cat = 0
var lion = 0

function gotresults(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log("got results")
        console.log(results)
        r = Math.floor(Math.random() * 255) + 1
        g = Math.floor(Math.random() * 255) + 1
        b = Math.floor(Math.random() * 255) + 1
        document.getElementById("result_label").innerHTML = "I can hear-" + results[0].label
        document.getElementById("result_count").innerHTML = 'Detected Dog - ' + dog + ' Detected Cat - ' + cat + 'Detected Lion-' + lion

        document.getElementById("result_label").style.color = "rgb(" + r + "," + g + "," + b + ")"
        document.getElementById("result_count").style.color = "rgb(" + r + "," + g + "," + b + ")"
        img = document.getElementById("animal_image")
        if (results[0].label == "Barking") {
            img.src = 'bark.gif';
            dog = dog + 1;
        } else if (results[0].label == "meow") {
            img.src = 'meow.gif';
            cat = cat + 1;
        }
        else if (results[0].label == "roar") {
            img.src = 'roar.gif';
            lion = lion + 1;
        }
         else
         {
            img.src = 'listen.gif';
        }
    }
}