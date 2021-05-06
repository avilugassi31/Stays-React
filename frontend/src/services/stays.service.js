import { httpService } from './http.service';

const STAYS_URl = 'stay/';
export const stayService = {
    getStays,
    getById,
    deleteStay,
    saveStay,
    getEmptyStay,
    getStaysByHost,
};

async function getStays(filterBy = null) {
    const stays = await httpService.get(STAYS_URl, filterBy);
    console.log('stays:', stays)
    var staysToReturn = stays;
    if (filterBy) {
        staysToReturn = filter(filterBy);
    }
    return staysToReturn;
}

function getById(id) {
    return httpService.get(STAYS_URl + id);
}

function deleteStay(id) {
    return httpService.delete(STAYS_URl + id);
}

function saveStay(stay) {
    if (stay._id) {
        return httpService.put(STAYS_URl + stay._id, stay);
    } else {
        return httpService.post(STAYS_URl, stay);
    }
}
function getEmptyStay() {
    return {
        name: '',
        imgs: [],
        country: '',
        city: '',
        description: '',
        price: 0,
        host: {},
        rate: 0,
        capacity: 0,
        members: 0,
        locs: [],
        tags: [],
        reviews: [],
    };
}

async function filter({ term }) {
    term = term.toLocaleLowerCase();
    const stays = await httpService.get(STAYS_URl);
    return stays.filter((stay) => {
        return stay.name.toLocaleLowerCase().includes(term);
    });
}

async function getStaysByHost(hostId) {
    const stays = await httpService.get(STAYS_URl);
    const staysByHost = stays.filter((stay) => {
        return stay.host._id === hostId;
    });
    return staysByHost;
}
