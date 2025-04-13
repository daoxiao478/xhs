import { useToast } from "@/components/ui/toast/use-toast";

const { toast } = useToast();

export const useAuthStore = defineStore("auth", () => {
  const qrCode = ref("");
  const loading = ref(false);
  const userInfo = ref<{
    user_id: string;
    nickname: string;
    images: string;
  } | null>(null);

  async function getQRCode() {
    loading.value = true;
    qrCode.value = await $fetch("/api/proxy/code_base64");
    loading.value = false;
  }

  async function refreshQRCode() {
    qrCode.value = await $fetch("/api/proxy/code_base64?t=" + Date.now());
  }

  async function me() {
    try {
      const data = await $fetch<{
        data: { user_id: string; nickname: string; images: string };
      }>("/api/xhs/me");
      if (!data?.data?.user_id) {
        navigateTo("/login");
      }

      userInfo.value = data.data;
    } catch (error) {
      console.error("获取用户信息失败:", error);
      userInfo.value = null;
      navigateTo("/login");
    }
  }

  onMounted(async () => {
    await me();
  });

  async function logout() {
    userInfo.value = null;
    navigateTo("/login");
  }

  async function loginWithCookie(ck: string) {
    const response = await $fetch<{ success: boolean; message: string }>(
      "/api/xhs/ck",
      {
        method: "POST",
        body: { ck },
      }
    );

    if (response.success) {
      await me();
      navigateTo("/");
      toast({
        title: "登录成功",
        description: "Cookie 登录成功",
      });
      return;
    }

    toast({
      title: "登录失败",
      description: "Cookie 无效或已过期",
      variant: "destructive",
    });
  }

  return {
    qrCode,
    loading,
    userInfo,
    getQRCode,
    refreshQRCode,
    logout,
    loginWithCookie,
  };
});
