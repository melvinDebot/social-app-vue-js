<template>
  <div id="dashboard">
    <transition name="fade">
      <CommentModal v-if="showCommentModal" :post="selectedPost" @close="toggleCommentModal()"></CommentModal>
    </transition>
    <section>
      <div class="wrapper">
        <img :src="logo" alt="logo chat App"/>
      </div>
      <div class="col1">
        <div class="profile">
          <p>Your username : <span>{{ userProfile.name }}</span></p>
          <p>Description : {{ userProfile.title }}</p>
          <div class="create-post">
            <span>Close</span>
            <p>create a post</p>
            <form @submit.prevent>
              <textarea v-model.trim="post.content" placeholder="What’s happening ?"></textarea>
              <button @click="createPost()" :disabled="post.content === ''" class="button">post</button>
            </form>
          </div>
        </div>
      </div>
      <div class="col2">
        <div v-if="posts.length">
          <div v-for="post in posts" :key="post.id" class="post">
            <ul>
              <li>
                <a @click="toggleCommentModal(post)">
                  <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4359 8.89103C21.4359 13.8014 16.6373 17.7821 10.7179 17.7821C10.0021 17.7821 9.30268 17.7238 8.62613 17.6128C8.03011 17.5551 7.67622 17.6103 7.06531 17.7992C6.83941 17.8691 6.57551 18.0102 6.27306 18.1719C5.59549 18.5343 4.72446 19 3.65387 19C3.6337 19 3.70152 18.9328 3.81759 18.8179C4.20195 18.4373 5.1154 17.5328 5.1154 16.8077V16.4721C2.0466 14.9081 0 12.0978 0 8.89103C0 3.98065 4.79859 0 10.7179 0C16.6373 0 21.4359 3.98065 21.4359 8.89103Z" fill="#045C14"/>
                  </svg>
                {{ post.comments }}
                </a>
              </li>
              <li>
                <a @click="likePost(post.id, post.likes)">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9996 21.0542C-8 10 5.99999 -1.99997 11.9996 5.58809C18 -1.99997 32 10 11.9996 21.0542Z" stroke="#045C14" stroke-width="1.8"/>
                  </svg>
                  {{ post.likes }}
                </a>
              </li>
              <li><a @click="viewPost(post)">view full post</a></li>
            </ul>
            <div class="post--text">
              <h5>{{ post.userName }}</h5>
              <span>{{ post.createdOn | formatDate }}</span>
              <p>{{ post.content | trimLength }}</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>

    <!-- full post modal -->
    <transition name="fade">
      <div v-if="showPostModal" class="p-modal">
        <div class="p-container">
          <a @click="closePostModal()" class="close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.25 1H3.75C2.23122 1 1 2.23122 1 3.75V20.25C1 21.7688 2.23122 23 3.75 23H20.25C21.7688 23 23 21.7688 23 20.25V3.75C23 2.23122 21.7688 1 20.25 1Z" stroke="#045C14" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.75 9.25L9.25 14.75M9.25 9.25L14.75 14.75L9.25 9.25Z" stroke="#045C14" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <div class="post">
            <h5>{{ fullPost.userName }}</h5>
            <span>{{ fullPost.createdOn | formatDate }}</span>
            <p>{{ fullPost.content }}</p>
            <ul>
              <li>
                <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4359 8.89103C21.4359 13.8014 16.6373 17.7821 10.7179 17.7821C10.0021 17.7821 9.30268 17.7238 8.62613 17.6128C8.03011 17.5551 7.67622 17.6103 7.06531 17.7992C6.83941 17.8691 6.57551 18.0102 6.27306 18.1719C5.59549 18.5343 4.72446 19 3.65387 19C3.6337 19 3.70152 18.9328 3.81759 18.8179C4.20195 18.4373 5.1154 17.5328 5.1154 16.8077V16.4721C2.0466 14.9081 0 12.0978 0 8.89103C0 3.98065 4.79859 0 10.7179 0C16.6373 0 21.4359 3.98065 21.4359 8.89103Z" fill="#045C14"/>
                </svg>
                <a>
                  {{ fullPost.comments }}
                </a>
              </li>
              <li>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.9996 21.0542C-8 10 5.99999 -1.99997 11.9996 5.58809C18 -1.99997 32 10 11.9996 21.0542Z" fill="#A7FF83"/>
                </svg>
                <a>
                  {{ fullPost.likes }}
                </a>
              </li>
            </ul>
          </div>
          <div v-show="postComments.length" class="comments">
            <div v-for="comment in postComments" :key="comment.id" class="comment">
              <h6>{{ comment.userName }}</h6>
              <span>{{ comment.createdOn | formatDate }}</span>
              <p>{{ comment.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { commentsCollection } from '@/firebase'
import { mapState } from 'vuex'
import moment from 'moment'
import CommentModal from '@/components/CommentModal'
import logo from '../assets/icons/logo-wrapper.svg'

export default {
  components: {
    CommentModal
  },
  data() {
    return {
      post: {
        content: ''
      },
      showCommentModal: false,
      selectedPost: {},
      showPostModal: false,
      fullPost: {},
      postComments: [],
      logo : logo
    }
  },
  computed: {
    ...mapState(['userProfile', 'posts'])
  },
  methods: {
    createPost() {
      this.$store.dispatch('createPost', { content: this.post.content })
      this.post.content = ''
    },
    toggleCommentModal(post) {
      this.showCommentModal = !this.showCommentModal
      // if opening modal set selectedPost, else clear
      if (this.showCommentModal) {
        this.selectedPost = post
      } else {
        this.selectedPost = {}
      }
    },
    likePost(id, likesCount) {
      this.$store.dispatch('likePost', { id, likesCount })
    },
    async viewPost(post) {
      const docs = await commentsCollection.where('postId', '==', post.id).get()
      docs.forEach(doc => {
        let comment = doc.data()
        comment.id = doc.id
        this.postComments.push(comment)
      })
      this.fullPost = post
      this.showPostModal = true
    },
    closePostModal() {
      this.postComments = []
      this.showPostModal = false
    }
  },
  filters: {
    formatDate(val) {
      if (!val) { return '-' }
      let date = val.toDate()
      return moment(date).fromNow()
    },
    trimLength(val) {
      if (val.length < 200) { return val }
      return `${val.substring(0, 200)}...`
    }
  }
}
</script>

<style lang="scss" scoped>
</style>