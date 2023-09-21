<template>
	<div>
		<VApp>
			<VMain>
				<slot/>
			</VMain>
      <FooterComponent></FooterComponent>
		</VApp>
	</div>
</template>

<script>
import HeaderComponent from '~/fragments/header.vue';
import FooterComponent from '~/fragments/footer.vue';

export default {
  name: 'DefaultLayout',
  components: {
    HeaderComponent,
    FooterComponent,
  },
}
</script>
