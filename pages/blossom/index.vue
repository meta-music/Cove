<template>
	<view class="u-bg-malandy-g3" :style="defaultHeight">
		<view class="canvas" :style="'height:'+getWindowsHeight*0.8 +'px;'" >
			<canvas
			canvas-id="testCanvas" 
			id="testCanvas"
			:style="'height:'+getWindowsHeight*0.8 +'px;'"
			ref="container"
			 @click="handleChickSet">
			</canvas>
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
	import ref from 'vue'
	
	const container = new ref(null)
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
			
		},
		methods:{
			handleChickSet(e){
				console.log("sth");
				console.log(this.$refs.container.$el.clientHeight);
			},
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
	
</style>