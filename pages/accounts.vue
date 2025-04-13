<script setup lang="ts">
import AccountTable from '~/components/AccountTable.vue';
</script>

<template>
    <div class="min-h-screen container mx-auto font-inter bg-gray-50 flex flex-col gap-4">
        <div class=" px-4 py-2 flex items-center justify-between mt-8">
            <h1 class="text-2xl">账号管理</h1>
            <Button variant="link">添加账号</Button>
        </div>
        <div class="px-4 bg-white rounded-lg">
            <AccountTable />
        </div>
    </div>
</template>
