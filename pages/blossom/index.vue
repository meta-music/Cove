<template>
	<view class="" :style="defaultHeight">
		<!-- <view class="canvas" :style="'height:'+getWindowsHeight*0.8 +'px;'" >
			<canvas
			canvas-id="testCanvas" 
			id="testCanvas"
			:style="'height:'+getWindowsHeight*0.8 +'px;'"
			ref="container"
			 @click="handleChickSet">
			</canvas>
			
		</view> -->
		<view class="boxs" ref="cdone" @tap="getCloOne($event)">
			<view class="">======</view>
		</view>
		<view class="list">
			<block v-for="(item,index) in 4" :key="index">
				<view ref="cd" :class='"isa"+index' @tap="getClo($event,index)" style="position: relative; overflow: hidden;width: 400upx;height: 260upx;border: #007AFF 1upx solid;display: block;">cd{{item}}</view>
			</block>
		</view>
		<view v-if="show" class="flex center">
			<view class="u-p-10 u-font-size-20 u-font-white u-border-1 u-radius-20 u-p-l-40 u-p-r-40 uni-shadow-lg animation-fade"
				@click="handleClickNext">
				NEXT
			</view>
		</view>
	</view>
</template>

<script>
	import {mapActions,mapGetters,mapState} from 'vuex';
	import propTypes from 'prop-types';
	// import { CSSTransition, TransitionGroup } from 'react-transition-group';
	import uuid from 'uuid';
	import NoSleep from 'nosleep.js';
	import { merge } from 'rxjs';
	import Circle from '@/components/blossom/blossom.vue';
	import generation$ from '@/lib/core/input/generation.source';
	import makeInputSource from '@/lib/core/input/make-input-source';
	import feedbackDelay from '@/lib/core/operators/feedback-delay.operator';
	import colored from '@/lib/core/operators/colored.operator';
	import startAudioContext from '@/lib/audio/start-audio-context';
	import ref from 'vue';
	import particles from 'particles.js';
	import add from './Click-animation.js';
	
	const container = new ref(null)
	const cdone = new ref(null)
	const MIN_DELAY_MS = 7000;
	const MAX_EXTRA_DELAY_MS = 5000;
	export default{
		data(){
			return{
				show:true,
			}
		},
		computed:{
				...mapState(['Interval']),
				// 使用对象展开运算符将 getter 混入 computed 对象中
				...mapGetters(['defaultHeight','getWindowsHeight']),
		},
		mounted() {
			//particlesJS.load('particles','./static/particles_nasa.json');
		},
		methods:{
			getCloOne(e){
				let el = this.$refs.cdone.$el;
				
				let a =  uni.createSelectorQuery()
					.select(".boxs")
				a.fields({
				  size: true,
				  scrollOffset: true
				}, data => {
					add(e,el,data)
				}).exec();
			},
			getClo(e,ins) {
				let el = document.getElementsByClassName(`isa${ins}`)[0]
				let a =  uni.createSelectorQuery()
					.select(`.isa${ins}`)
				a.fields({
				  size: true,
				  scrollOffset: true
				}, data => {
				  add(e,el,data)
				}).exec();
			},
			// handleChickSet(e){
			// 	console.log("sth");
			// 	console.log(this.$refs.container.$el.clientHeight);
			// },
			handleClickNext(e){
				uni.navigateTo({
					url:'../details/index',
					complete(res) {
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	#particles{
	      position: absolute;
	      width: 100%;
	      height: 100%;
	      background-color: #000022;
	      background-repeat: no-repeat;
	      background-size: cover;
	      background-position: 50% 50%;
	}
	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90vh;
		.boxs {
			width: 30%;
			border: 1upx solid $uni-border-color;
			height: 100%;
			//以下重要的样式
			position: relative;
			overflow: hidden;
		}
		.list {
			width: 68%;
			border: 1upx solid $uni-border-color;
			height: 100%;
		}
	}
</style>