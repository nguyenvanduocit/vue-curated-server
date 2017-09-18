
import * as Database from '../providers/database'
import * as Cache from '../providers/cache'
import * as Memory from '../providers/memory'

import { filterFactory } from '../utils/database'

export function getCategories () {
  return Database.categories.find({})
}

export function getCategory (id) {
  return Database.categories.findOne({ id })
}

export function getModule (id) {
  return Database.modules.findOne({ id })
}

export async function getModuleDetails (moduleId) {
  const module = await getModule(moduleId)
  return Cache.repoDetails.get(module.owner, module.repoName)
}

export async function getModuleReadme (moduleId) {
  const module = await getModule(moduleId)
  return Cache.repoReadmes.get(module.owner, module.repoName)
}

export async function getModuleReleases (moduleId) {
  const module = await getModule(moduleId)
  return Cache.repoReleases.get(module.owner, module.repoName)
}

export async function getModuleNpmPackage (moduleId) {
  const module = await getModule(moduleId)
  return Cache.repoPackageJson.get(module.owner, module.repoName)
}

export function getModules (filter) {

  const query = filterFactory(filter, {
    category: 'category_id'
  })
  return Database.modules.find(query)
}
