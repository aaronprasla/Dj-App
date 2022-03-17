song = '';

rwx = 0;
rwy = 0;

lwx = 0;
lwy = 0;

lwscore = 0;
rwscore = 0;

function preload() {
	song = loadSound('music.mp3');
}

function setup() {
	canvas = createCanvas(600, 500);
	canvas.center();

	video = createCapture(VIDEO);
	video.hide();

	posenet = ml5.poseNet(video, modelLoaded)
	posenet.on('pose', gotPoses);
}

function draw() {
	image(video, 0, 0, 600, 500);

	fill('#FF0000');
	stroke('#FF0000');

	if(lwscore > 0.2){
		circle(lwx, lwy, 20);

		nlwx = Number(lwx);
		remove_decimals = floor(nlwx);
		volume = remove_decimals/500;
		document.getElementById('volume').innerHTML = 'Volume = ' + volume;

		song.setVolume(volume);
	}

	fill('#FF0000');
	stroke('#FF0000');

	if(rwscore > 0.2){
		circle(rwx, rwy, 20);

		nrwx = Number(rwx);
		remove_decimals = floor(nrwx);
		if(rwx > 0 && rwx <=100){
			document.getElementById('speed').innerHTML = 'Speed = 0.5';
			song.rate(0.5);
		}else if(rwx > 100 && rwx <= 200){
			document.getElementById('speed').innerHTML = 'Speed = 1';
			song.rate(1);
		}else if(rwx > 200 && rwx <= 300){
			document.getElementById('speed').innerHTML = 'Speed = 1.5';
			song.rate(1.5);
		}else if(rwx > 300 && rwx <= 400){
			document.getElementById('speed').innerHTML = 'Speed = 2';
			song.rate(2);
		}else if(rwx > 400 && rwx <= 500){
			document.getElementById('speed').innerHTML = 'Speed = 2.5';
			song.rate(2.5);
		}
	}

}

function play() {
	song.rate(1);
	song.setVolume(1);

	song.play();
}

function modelLoaded() {
	console.log('Posenet is intitialised.');
}

function gotPoses(results) {
	if(results.length > 0) {

		console.log(results);

		rwx = results[0].pose.rightWrist.x;
		rwy = results[0].pose.rightWrist.y;

		lwx = results[0].pose.leftWrist.x;
		lwy = results[0].pose.leftWrist.y;

		console.log('Right Wrist X = ' + rwx + ' Right Wrist Y = ' + rwy);

		console.log('Left  Wrist X = ' + lwx + ' Left Wrist Y = ' + lwy);

		lwscore = results[0].pose.keypoints[9].score;
		console.log('lwscore = ' + lwscore);

		rwscore = results[0].pose.keypoints[10].score;
		console.log('rwscore = ' + rwscore);
	}
}