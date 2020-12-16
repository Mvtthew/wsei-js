class SoundChannel {
	recordingStart = null;
	recordedSounds = [];

	startRecording() {
		this.recordingStart = Date.now();
	}

	stopRecording() {
		this.recordingStart = null;
	}

	delRecording() {
		this.recordedSounds = [];
	}

	recordKey(soundIndex) {
		if (this.recordingStart) {
			this.recordedSounds.push({ soundIndex, time: Date.now() - this.recordingStart });
		}
	}

	playRecording() {
		this.recordedSounds.forEach((recordedSound) => {
			setTimeout(() => {
				playSound(recordedSound.soundIndex);
			}, recordedSound.time);
		});
	}
}

const buttons = document.querySelectorAll('.button');
const recordChannels = [];

const sounds = [
	{
		key: 'q',
		sound: './sounds/clap-mix.wav',
	},
	{
		key: 'w',
		sound: './sounds/clap.wav',
	},
	{
		key: 'e',
		sound: './sounds/clap2.wav',
	},
	{
		key: 'a',
		sound: './sounds/dwsd.wav',
	},
	{
		key: 's',
		sound: './sounds/synthnisse__claps.wav',
	},
	{
		key: 'd',
		sound: './sounds/zippo.wav',
	},
];

const playSound = (soundIndex) => {
	recordChannels.forEach((channel) => channel.recordKey(soundIndex));

	buttons[soundIndex].classList.add('active');
	setTimeout(() => {
		buttons[soundIndex].classList.remove('active');
	}, 200);
	const a = new Audio(sounds[soundIndex].sound);
	a.play();
};

const initButtons = () => {
	buttons.forEach((button, index) => {
		document.addEventListener('keydown', (e) => {
			if (e.key === sounds[index].key) {
				playSound(index);
			}
		});
	});
};

const initSoundChannels = () => {
	const soundChannels = document.querySelectorAll('.sound-channel');
	soundChannels.forEach((soundChannel) => {
		const channel = new SoundChannel();
		recordChannels.push(channel);

		const recordBtn = soundChannel.querySelector('.rec');
		const playBtn = soundChannel.querySelector('.play');
		const delBtn = soundChannel.querySelector('.del');

		recordBtn.addEventListener('click', () => {
			if (!channel.recordingStart) {
				recordBtn.innerText = 'Stop';
				channel.startRecording();
				playBtn.setAttribute('disabled', true);
				delBtn.setAttribute('disabled', true);
			} else {
				recordBtn.innerText = 'Record';
				channel.stopRecording();
				playBtn.removeAttribute('disabled', true);
				delBtn.removeAttribute('disabled', true);
			}
		});

		playBtn.addEventListener('click', () => {
			channel.playRecording();
		});

		delBtn.addEventListener('click', () => {
			channel.delRecording();
		});
	});
};

initSoundChannels();
initButtons();
