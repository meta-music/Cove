<template>
	<view class="circle"
	:style="{
      'backgroundColor': color,
      'left': `calc(${xPct}% - 250px)`,
      'top': `calc(${yPct}% - 250px)`,
      'opacity': opacity,
    }">
	</view>
</template>

<script>
	export default {
		data() {
			return {
				color : '',
				xPct : '',
				yPct : '',
				opacity : 0.9
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.circle-enter {
	width: 500px;
	height: 500px;
	border-radius: 50%;
	position: fixed;
	transform: scale(0);
	transition: transform 7s linear, opacity 7s linear;
	will-change: transform, opacity;
	overflow: visible;
	}
	
	.circle-enter-active {
	transform: scale(1);
	opacity: 0;
	}

</style>
