export default defineNuxtRouteMiddleware(async () => {
  const router = useRouter()
  // console.log('user session:' + USER_SESSION.value);
  if (!USER_SESSION.value) {
    router.push('/login')
  }
})