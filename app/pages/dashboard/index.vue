<template>
  <PageContainer>
    <PageTitle
      ><span><i class="icon dashboard"></i> Your Dashboard</span></PageTitle
    >
    <div class="my-10">
      <div class="text-xl font-bold mb-5">Your Upcoming sessions</div>
      <UTable :columns="columns" :rows="rows">
        <template #actions-data="{ row }">
          <UButton class="bg-blue-500 hover:bg-blue-600 text-white"
            >View</UButton
          >
        </template>
      </UTable>
    </div>
  </PageContainer>
</template>

<script setup lang="ts">
const sessions = ref<SessionApiResponse[]>();
const columns = [
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "organiserName", label: "Organiser" },
  { key: "cost", label: "Cost" },
  { key: "hasPaid", label: "Paid" },
  { key: "actions" },
];
const { data: sessionsForUser } = await useFetch(
  `/api/sessionsForUser?userId=1`,
);

sessions.value = sessionsForUser.value.data;
const rows = sessions.value.map((session) => {
  return {
    date: session.date.split("T")[0],
    time: session.date.split("T")[1].split(".")[0],
    organiserName: session.organiserName,
    cost: session.cost,
    hasPaid: session.hasPaid,
  };
});
</script>
