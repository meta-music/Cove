import Vue from "vue"
import Vuex from "vuex"
import * as Tone from "tone";

import { Scale } from 'tonal';
import getInstrument from './get-instrument';
import { Sampler, Filter, Master, Compressor } from 'tone';
import samples from '../../static/samples.json';

//组合
const synth = new Tone.Synth().toDestination();

Vue.use(Vuex);

let state={
	version:'0.1.0',
	systemInfo:{},
	defaultHeight:{
		//最低高度
		"min-height":"800rpx",
	},
	mood:[
		['开心','沮丧','烦恼','强烈','焦虑','满意','兴奋'],
		['害怕','平静','被爱','受伤','后悔','极度','嗨'],
		['难过','成熟','脆弱','孤单','阴郁','失落','感激'],
		['低沉','困惑','罪恶','抑郁','愤怒','孤独']
		],
	//当前新增列表 project
	project:{
		mood:[],
		audio:'',
		volume:10,
		synth:[],
		title:'NOTHING...',
		thoughts:'NOTHING...',
		location:'NOTHING...',
	},
	//模版
	template:{
			mood:[],
			audio:'',
			volume:10,
			synth:[],
			title:'NOTHING...',
			thoughts:'NOTHING...',
			location:'NOTHING...',
	},
	//所有过往记录列表 list
	list:[
		// {
		// 	id: 'AA', 				//id
		// 	title:'标题',			//标题
		// 	backgroundMusic:'aaa', //背景音乐
		// 	dateTime:'2022-04-04 22:15:43',//时间
		// 	thoughts:'没有想法............',	//想法
		// 	location:'百慕大三角',	//位置
		// 	imageUrl:'',			//图片地址
		// 	mood:[],				//心情
		// 	synth:[]				//音阶组合
		// }
	],
	//音频处理
	index:-1, //选中的指标
	playing:false,
	playerState:'',
	player:false,	//背景音乐播放器
	synth:false,	//音阶组合播放器
	source:false,
	Interval:false, //循环
}

let mutations={
	addMood(state,value){
		state.project.mood.push(value);
	},
	deleteMood(state,value){
		state.project.mood.splice(value,1);
	},
	setSystemInfo(state,value){
		state.systemInfo = value;
		//屏幕高度减去标题高度
		state.defaultHeight['min-height'] = (value.windowHeight - 43)+"px";
	},
	setProjectAudio(state,value){
		state.project.audio = value;
	},
	CLEAR_INDEX(){
		state.index = -1;
	},
	CLEAR_STORAGE(){
		
	},
	RESET_PROJECT(state){
		state.project = JSON.parse(JSON.stringify(state.template))
	}
}

let getters={
	getMood(state){
		return state.mood;
	},
	getWindowsHeight:(state)=>{
		return state.systemInfo.windowHeight - 43
	},
	findMood:(state)=>(value)=>{
		return state.project.mood.findIndex(item=>{
					return item === value
				});
	},
	defaultHeight(state){
		return state.defaultHeight
	},
	getPlayerState(state){
		return state.player? state.player.state:'stoped'
	}
}

let actions={
	//初始化音乐
	initPlayer({commit,state}){
		state.synth = new Tone.Synth().toDestination();
	},
	setPlayer({commit,state,getters}){
		//播放
		if(!state.player){
			if(getters.getPlayerState=='stoped'){
				set();
			}
			else if(getters.getPlayerState=='started'){
				state.player.stop();
				setTimeout(()=>{
					set();
					},100);
			}
		}
		else{
			set();
		}
		function set(){
			state.player = new Tone.Player({
				url:'/static/mp3/'+state.project.audio+'.mp3',
				autostart: true,
				loop:true
			}).toDestination();
			state.source = new Tone.PWMOscillator().toDestination();
		}
	},
	//播放音乐
	playerStart({commit,state,getters}){
		if(getters.getPlayerState=='stoped'){
			Tone.loaded().then(() => {
				state.player.start();
				commit('PLAYER_START');
			});
		}
		else{
			console.log('播放状态:',getters.getPlayerState);
		}
	},
	playerStop({commit,state,getters}){
		if(getters.getPlayerState=='started'){
			state.player.stop();
		}
		else{
			console.log('播放状态:',getters.getPlayerState);
		}
	},
	playerVolume({commit,state,getters},value){
		var {volume,step} = value;
		if(getters.getPlayerState=='started'){
			state.player.volume.value = volume;
			state.project.volume = volume;
		}
	},
	playerbackRate({commit,state,getters}){
		// play at 1/4 speed 音调
		state.player.playbackRate = 0.25;
	},
	//插入音阶
	synthGamut({commit,state}, yPct){
		const now = Tone.now();
		
		const ONE_HUNDRED = 100;
		const NOTE_TIME_OFFSET_S = 0.01;
		const VELOCITY = 1;
		
		const tonicPc = 'D';
		// eslint-disable-next-line no-magic-numbers
		const octaves = [2, 3, 4, 5, 6];
		const notes = octaves.reduce(
		  (allNotes, octave) =>
		    allNotes.concat(Scale.notes(`${tonicPc}${octave}`, 'major')),
		  []
		);
		
		const getNoteAtHeight = yPct =>
		  notes[
		    Math.min(
		      notes.length - 1,
		      Math.floor(((ONE_HUNDRED - yPct) / ONE_HUNDRED) * notes.length)
		    )
		  ];
		const note = getNoteAtHeight(yPct);
		const sampleFormat = 'mp3';
		
		const lowpass = new Filter({
		  frequency: 2500,
		  type: 'lowpass',
		});
		const lowshelf = new Filter({
		  freqequency: 1500,
		  type: 'lowshelf',
		  rolloff: -96,
		});
		const compressor = new Compressor();
		
		const getInstrument = () =>
		  new Promise(resolve => {
		    const instrument = new Sampler(
		      samples[`vsco2-piano-reverb-${sampleFormat}`],
		      {
		        onload: () => resolve(instrument),
		      }
		    ).chain(lowpass, lowshelf, compressor, Master);
		  });
		
		
		
		getInstrument.triggerAttack(note, now + NOTE_TIME_OFFSET_S, VELOCITY);
		console.log("test");
		//state.synth.triggerAttackRelease(note, now);
	},
	runSynthGamut({state}){
		if(state.project.synth!=[]){
			const now = Tone.now();
			var i=0;
			var yd = ['A4','B4','C5','B4','C5','E5','B4'];
			var jp = ['8n','8n','2n','8n','4n','8n','2n'];
			for(var item of state.project.synth){
				state.synth.triggerAttackRelease(yd[i], jp[i], now + item.up);
				i++;
			}
		}
	},
	saveSynthGamut({state},Arr){
		state.project.synth = Arr;
	},
	setProject({state},index){
		state.project = state.list[index];
		state.index = index;
	},
	saveInfo({state},Obj){
		var {title,thoughts,location} = Obj;
		if(title) state.project.title = title;
		if(thoughts) state.project.thoughts = thoughts;
		if(location) state.project.location = location;
	},
	deleteProject({state}){
		if(state.index!=-1){
			state.list.splice(state.index,1);
			uni.setStorage({
				key:'list',
				data:state.list,
				success:(res)=>{
					console.log('setStorage 存储数据:',res);
				}
			});
		}
	},
	saveProject({commit,state,getters}){
		//console.log('saveProject',state.project);
		state.project.date = new Date();
		state.list.push(state.project);
		uni.setStorage({
			key:'list',
			data:state.list,
			success:(res)=>{
				console.log('setStorage 存储数据:',res);
			}
			});
	},
	getProject({commit,state,getters}){
		uni.getStorage({
			key:'list',
			success:(res)=>{
				console.log('getStorage 读取数据:',res);
				if(res.data){
					if(res.data.length >0){
						state.list = res.data;
					}
				}
			}
		});
	},
	runIntervals({state},callback){
		callback(true);
		state.Interval = setInterval(()=>{
			callback(true);
		},10000);
	},
	clearIntervals({state}){
		//停止循环
		clearInterval(state.Interval);
	}
}

const store = new Vuex.Store({
		state,
		mutations,
		getters,
		actions
	})

export default store;