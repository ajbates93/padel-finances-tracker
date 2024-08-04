<template>
  <PageContainer>
    <PageTitle
      ><span
        ><i class="icon i-heroicons-dashboard"></i> Your Dashboard</span
      ></PageTitle
    >
    <div class="my-10">
      <div class="text-xl font-bold mb-5">Your Upcoming sessions</div>
      <UTable :columns="columns" :rows="rows">
        <template #actions-data="{ row }">
          <UButton class="bg-blue-500 hover:bg-blue-600 text-white">
            <NuxtLink :to="`/session/${row.id}`">View</NuxtLink>
          </UButton>
        </template>
      </UTable>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
import type { BaseApiResponse, SessionsForUserApiResponse } from "~~/types/api";

const sessionsForUser = ref<SessionsForUserApiResponse[]>([]);

const columns = [
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "organiserName", label: "Organiser" },
  { key: "cost", label: "Cost" },
  { key: "hasPaid", label: "Paid" },
  { key: "actions" },
];
const { data: dbSessionsForUser } = await useFetch<
  BaseApiResponse<SessionsForUserApiResponse[]>
>(`/api/sessionsForUser?userId=1`);

if (dbSessionsForUser.value) {
  sessionsForUser.value = dbSessionsForUser.value.data;
}

const rows = sessionsForUser.value.map((session) => {
  return {
    id: session.id,
    date: session.date.toString().split("T")[0],
    time: session.date.toString().split("T")[1]?.split(".")[0],
    organiserName: session.organiserName,
    cost: session.cost,
    hasPaid: session.hasPaid ? "Yes" : "No",
  };
});
</script>
