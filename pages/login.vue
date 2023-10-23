<template>
    <BRow class="login justify-content-center">
        <BCol cols=12 md="4">
            <BForm @submit.prevent="post" class="d-flex gap-sm flex-column flex-wrap">
                <div v-if="isSignup">
                    <label>Seu nome</label>
                    <BFormInput v-model="signupForm.name" />
                </div>

                <div>
                    <label>E-mail</label>
                    <BFormInput v-model="authForm.email" />
                </div>

                <div>
                    <label>Senha</label>
                    <BFormInput type="password" v-model="authForm.password" />
                </div>
                <BButton type="submit" variant="success">
                    Enviar
                </BButton>
                {{ errorMsg }}
            </BForm>
        </BCol>
        <BButton variant="link" @click="isSignup = !isSignup" class="mt-3">
            {{ isSignup ? 'Já possui uma conta? Faça login' : 'Não possui uma conta? Cadastre-se!' }}
        </BButton>
    </BRow>
</template>
<script lang="ts" setup>
import { Auth, User } from '~~/types';
import { apiClient } from '~~/util/ApiClient';

const router = useRouter();
const user = useComputedUser();
const LocalStorage = useLocalStorage();

const isLoading = useGlobalLoader();

const errorMsg = ref('');
const isSignup = ref(false);

const authForm = ref<Auth>({
    email: '',
    password: ''
})

const signupForm = ref<User>({
    email: '',
    name: '',
    password: '',
})

async function send() {
    isLoading.value = true;
    try {
        errorMsg.value = '';
        const { name, jwt } = await apiClient.authenticate(authForm.value);
        user.value = {
            name,
            email: authForm.value.email
        }
        LocalStorage.set('user', user.value);
        LocalStorage.set('jwt', jwt);

        router.push('/');
    } catch (error) {
        errorMsg.value = error.message;
    } finally {
        isLoading.value = false;
    }
}

async function signup() {
    try {
        errorMsg.value = '';

        const data: User = {
            ...authForm.value,
            name: signupForm.value.name
        }
        await apiClient.createUser(data);
        send();

    } catch (error) {
        errorMsg.value = error.message;
        console.error(error)
    }
}

function post() {
    isSignup.value ? signup() : send()
}
</script>
