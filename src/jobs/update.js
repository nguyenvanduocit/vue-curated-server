
import * as GitHub from '../providers/github'
import * as Database from '../providers/database'

export async function updateDatasets () {
  try {
    const {
      modules,
      categories,
    } = await GitHub.getModules()

    await Database.modules.sync(modules)
    await Database.categories.sync(categories)

    console.log('updateDatasets completed')

    return true
  } catch (e) {
    console.error(e)

    return false
  }
}
