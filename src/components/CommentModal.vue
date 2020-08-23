<template>
  <div class="c-modal">
    <div class="c-container">
      <a @click="$emit('close')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.25 1H3.75C2.23122 1 1 2.23122 1 3.75V20.25C1 21.7688 2.23122 23 3.75 23H20.25C21.7688 23 23 21.7688 23 20.25V3.75C23 2.23122 21.7688 1 20.25 1Z" stroke="#045C14" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14.75 9.25L9.25 14.75M9.25 9.25L14.75 14.75L9.25 9.25Z" stroke="#045C14" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
      <h5>add a comment</h5>
      <form @submit.prevent>
        <textarea v-model.trim="comment"></textarea>
        <button @click="addComment()" :disabled="comment == ''" class="button">add comment</button>
      </form>
    </div>
  </div>
</template>

<script>
import { commentsCollection, postsCollection, auth } from '@/firebase'
export default {
  props: ['post'],
  data() {
    return {
      comment: ''
    }
  },
  methods: {
    async addComment() {
      // create comment
      await commentsCollection.add({
        createdOn: new Date(),
        content: this.comment,
        postId: this.post.id,
        userId: auth.currentUser.uid,
        userName: this.$store.state.userProfile.name
      })
      // update comment count on post
      await postsCollection.doc(this.post.id).update({
        comments: parseInt(this.post.comments) + 1
      })
      // close modal
      this.$emit('close')
    }
  }
}
</script>