import { post, get,  patch ,remove } from './axios';

export async function saveHub (hub) {
  if (hub.id) {
    const body = { ...hub };
    delete body.id;

    body.links.forEach(link => {
      delete link.link;
      delete link.views;
    });

    delete body.views;
    delete body.isEnabled;
    delete body.createdAt;
    delete body.updatedAt;
    delete body.user;
    delete body.randomSlug;

    return patch(`v1/hubs/${hub.id}`, body);
  } else {
    return post('v1/hubs', hub);
  }
}

export async function getHubBySlug (slug) {
  return get(`v1/hubs/${slug}`);
}

export async function getHubById (id) {
  return get(`v1/hubs/${id}`);
}

export async function getStats (id) {
  return get(`v1/hubs/${id}/stats`);
}

export async function updateHub (hub) {
  return patch(`v1/hubs/${hub._id}`, hub);
}

export async function deleteHub (id) {
  return remove(`v1/hubs/${id}`);
}

export async function getHubs (search, sortBy) {
  return get(`v1/hubs?search=${search || ''}&sortBy=${sortBy || ''}`);
}


