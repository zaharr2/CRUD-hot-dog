<template>
  <v-container fluid pl-0 pr-0>
    <v-data-table
      :headers="headers"
      :items="allHotDogs"
      :loading="loading"
      loading-text="Loading... Please wait"
      sort-by="calories"
    >
      <template v-slot:top>
        <v-toolbar
          flat
          color="white"
        >
          <v-toolbar-title>Hot dogs CRUD</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-on="on"
                @click="$v.$touch()"
              >
                Add hot dog
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model.trim="editedItem.additive"
                        label="Additive"
                        required
                        :error-messages="errors('Additive')"
                        @input="$v.editedItem.additive.$touch()"
                        @blur="$v.editedItem.additive.$touch()"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model.trim="editedItem.bun"
                        label="Bun"
                        required
                        :error-messages="errors('Bun')"
                        @input="$v.editedItem.bun.$touch()"
                        @blur="$v.editedItem.bun.$touch()"
                      />
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model.trim="editedItem.ketchup"
                        label="Ketchup"
                        required
                        :error-messages="errors('Ketchup')"
                        @input="$v.editedItem.ketchup.$touch()"
                        @blur="$v.editedItem.ketchup.$touch()"
                      />
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model.trim="editedItem.mustard"
                        label="Mustard"
                        required
                        :error-messages="errors('Mustard')"
                        @input="$v.editedItem.mustard.$touch()"
                        @blur="$v.editedItem.mustard.$touch()"
                      />
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model.trim="editedItem.sausage"
                        label="Sausage"
                        required
                        :error-messages="errors('Sausage')"
                        @input="$v.editedItem.sausage.$touch()"
                        @blur="$v.editedItem.sausage.$touch()"
                      />
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  :disabled="$v.editedItem.$anyError"
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          edit
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="readAll"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'HotDogs',
  data: () => ({
    loading: true,
    dialog: false,
    headers: [
      { text: 'Additive', value: 'additive', align: 'left' },
      { text: 'Bun', value: 'bun' },
      { text: 'Ketchup', value: 'ketchup' },
      { text: 'Mustard', value: 'mustard' },
      { text: 'Sausage', value: 'sausage' },
      { text: 'Actions', value: 'action', sortable: false }
    ],
    editedIndex: -1,
    editedItem: {
      additive: '',
      bun: '',
      ketchup: '',
      mustard: '',
      sausage: ''
    },
    defaultItem: {
      additive: '',
      bun: '',
      ketchup: '',
      mustard: '',
      sausage: ''
    }
  }),
  validations: {
    editedItem: {
      additive: { required },
      bun: { required },
      ketchup: { required },
      mustard: { required },
      sausage: { required }
    }
  },
  computed: {
    ...mapGetters({
      allHotDogs: 'hotDogs/getAll'
    }),
    formTitle () {
      return this.editedIndex === -1 ? 'New hot dog' : 'Edit hot dog'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    this.readAll().then(() => { this.loading = false })
  },
  methods: {
    ...mapActions({
      create: 'hotDogs/create',
      readAll: 'hotDogs/readAll',
      update: 'hotDogs/update',
      delete: 'hotDogs/delete'
    }),
    errors (field) {
      let val = field.toLowerCase()
      const errors = []
      if (!this.$v.editedItem[val].$dirty) return errors
      !this.$v.editedItem[val].required && errors.push(`${field} is required.`)
      return errors
    },
    editItem (item) {
      this.editedIndex = this.allHotDogs.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    save () {
      this.loading = true
      if (this.editedIndex > -1) {
        let payload = {
          id: this.allHotDogs[this.editedIndex].id,
          data: this.editedItem
        }
        this.update(payload).then(() => {
          this.loading = false
        }).catch(error => {
          this.loading = false
          alert(error)
        })
      } else {
        this.create(this.editedItem).then(() => {
          this.loading = false
        }).catch(error => {
          this.loading = false
          alert(error)
        })
      }
      this.close()
    },
    deleteItem (item) {
      this.loading = true
      const index = this.allHotDogs.indexOf(item)
      const payload = {
        id: this.allHotDogs[index].id
      }
      confirm('Are you sure you want to delete this item?') && this.delete(payload).then(() => {
        this.loading = false
        this.$v.$reset()
      }).catch(error => {
        this.loading = false
        this.$v.$reset()
        alert(error)
      })
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.$v.$reset()
      }, 300)
    }
  }
}
</script>

<style scoped>

</style>
