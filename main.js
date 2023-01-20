noseX = 0;
noseY = 0;
function preload()
{
    mfilter = loadImage("m.png")
    lfilter = loadImage("l.png");
}
selected_filter = "m";
function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, ModelLoaded);
    poseNet.on("pose", gotPoses)
}
function Mustache()
{
    selected_filter = "m";
}
function Lipstick()
{
    selected_filter = "l";
}
function ModelLoaded()
{
    console.log("Model Loaded");
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        if(selected_filter == "m")
        {
            noseX = results[0].pose.nose.x - 50;
            noseY = results[0].pose.nose.y + 22;
        }
        if(selected_filter == "l")
        {
            noseX = results[0].pose.nose.x - 50;
            noseY = results[0].pose.nose.y + 30;
        }
        console.log('nosex = '+noseX);
        console.log('nosey = '+noseY);
    }
}
function draw()
{
    image(video, 0, 0, 600, 500);
    if(selected_filter == "m")
    {
        image(mfilter, noseX, noseY, 50, 20);
    }
    if(selected_filter == "l")
    {
        image(lfilter, noseX, noseY, 50, 25);
    }
}
function take_snapshot()
{
    save("filter.tiff");
}