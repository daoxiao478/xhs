<template>
  <div class="w-full">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>封面</TableHead>
          <TableHead>标题</TableHead>
          <TableHead>互动数据</TableHead>
          <TableHead>操作</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="index in 10" :key="index" class="hover:bg-gray-50">
          <TableCell>
            <Skeleton class="h-5 w-5" />
          </TableCell>
          <TableCell>
            <Skeleton class="h-16 w-20" />
          </TableCell>
          <TableCell>
            <Skeleton class="h-6 w-40" />
          </TableCell>
          <TableCell>
            <Skeleton class="h-5 w-24" />
          </TableCell>
          <TableCell>
            <div class="flex gap-2">
              <Skeleton class="h-9 w-16" />
              <Skeleton class="h-9 w-16" />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
</script>