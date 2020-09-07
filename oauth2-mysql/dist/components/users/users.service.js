"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const mongodb_1 = require("mongodb");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    create(user) {
        return this.usersRepository.save(Object.assign(Object.assign({}, user), { verified: false }));
    }
    getByEmail(email, verified = true) {
        return this.usersRepository.findOne({
            email,
            verified,
        });
    }
    getById(id, verified = true) {
        return this.usersRepository.findOne({
            _id: new mongodb_1.ObjectID(id),
            verified,
        });
    }
    async createIfDoesNotExist(user) {
        const foundUser = await this.usersRepository.findOne({
            email: user.email,
        });
        let createdUser = foundUser;
        if (!foundUser) {
            createdUser = await this.usersRepository.create(user);
        }
        return createdUser;
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(user_entity_1.default)),
    __metadata("design:paramtypes", [typeorm_1.MongoRepository])
], UsersService);
exports.default = UsersService;
//# sourceMappingURL=users.service.js.map