<template>
  <v-container fluid pl-0 pr-0>
    <v-data-table
      :headers="headers"
      :items="allHotDogs"
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
                        v-model="editedItem.additive"
                        label="Additive"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model="editedItem.bun"
                        label="Bun"
                      />
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model="editedItem.ketchup"
                        label="Ketchup"
                      />
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model="editedItem.mustard"
                        label="Mustard"
                      />
                    </v-flex>
                    <v-flex xs12 sm6 md4>
                      <v-text-field
                        v-model="editedItem.sausage"
                        label="Sausage"
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

export default {
  name: 'HotDogs',
  data: () => ({
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
    this.readAll()
  },
  methods: {
    ...mapActions({
      readAll: 'hotDogs/readAll',
      create: 'hotDogs/create',
      update: 'hotDogs/update',
      delete: 'hotDogs/delete'
    }),
    editItem (item) {
      this.editedIndex = this.allHotDogs.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.allHotDogs.indexOf(item)
      const payload = {
        id: this.allHotDogs[index].id
      }
      confirm('Are you sure you want to delete this item?') && this.delete(payload)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        let payload = {
          id: this.allHotDogs[this.editedIndex].id,
          data: this.editedItem
        }
        this.update(payload)
      } else {
        this.create(this.editedItem).catch(error => {
          alert(error)
        })
      }
      this.close()
    }
  }
}
</script>

<style scoped lang="stylus">

</style>
