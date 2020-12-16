/**
 * @file Github 项目数据状态 / ES module
 * @module store/project
 * @author madao <https://github.com/madao-china>
 */

export const state = () => {
  return {
    repositories: {
      fetching: false,
      data: []
    }
  }
}

export const mutations = {
  updateRepositoriesFetching(state, action) {
    state.repositories.fetching = action
  },
  updateRepositoriesData(state, action) {
    state.repositories.data = action
      .filter(repo => !repo.fork && (!repo.description || !repo.description.startsWith('#')))
      .sort((prev, next) => next.stargazers_count - prev.stargazers_count)
  }
}

export const actions = {

  fetchRepositories({ commit, state }) {
    // 如果数据已存在，则直接返回
    if (state.repositories.data.length) {
      return Promise.resolve(state.repositories.data)
    }

    // 不存在则请求新数据
    commit('updateRepositoriesFetching', true)
    return this.$axios.$get('/su/admin/repo').then(response => {
      const newResult = []
      JSON.parse(response.data).forEach((element, index) => {
        const {
          html_url,
          name,
          fork,
          forks,
          forks_count,
          description,
          open_issues_count,
          stargazers_count,
          created_at,
          language
        } = element
        newResult.push({
          html_url,
          name,
          fork,
          forks,
          forks_count,
          description,
          open_issues_count,
          stargazers_count,
          created_at,
          language
        })
      })
      commit('updateRepositoriesData', newResult)
      commit('updateRepositoriesFetching', false)
    }).catch(() => commit('updateRepositoriesFetching', false))
  }
}
