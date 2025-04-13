export default defineNuxtPlugin(_nuxtApp => {
  globalThis.$fetch = $fetch.create({
    onRequest({ options }) {
      // 添加token
    },
    onResponseError({ response }) {
      const data = response._data;

      // 处理401错误
      // if (response.status === 401) {
      //   const userStore = useUserStore();
      //   userStore.logout();
      //   navigateTo('/login');
      // }
    }
  });
});
