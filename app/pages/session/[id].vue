<template>
  <PageContainer>
    <PageTitle>Session Details</PageTitle>
    <div class="my-10">
      <pre>{{ session }}</pre>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
const route = useRoute();

const session = ref<SessionApiResponse>();

const { data: dbSession } = await useFetch<BaseApiResponse<SessionApiResponse>>(
  `/api/sessions?id=${route.params.id}`,
);

if (dbSession.value) {
  session.value = dbSession.value.data[0];
}
</script>
