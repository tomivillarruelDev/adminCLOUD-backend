import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

// Importar controladores
import { PolicyController } from './controllers/policy.controller';
import { ProductController } from './controllers/product.controller';
import { PlanController } from './controllers/plan.controller';
import { BranchController } from './controllers/branch.controller';

// Importar servicios
import { PolicyService } from './services/policy.service';
import { ProductService } from './services/product.service';
import { PlanService } from './services/plan.service';
import { BranchService } from './services/branch.service';

// Importar schemas
import { Policy, PolicySchema } from './schemas/policy.schema';
import { Product, ProductSchema } from './schemas/product.schema';
import { Plan, PlanSchema } from './schemas/plan.schema';
import { Branch, BranchSchema } from './schemas/branch.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Policy.name, schema: PolicySchema },
      { name: Product.name, schema: ProductSchema },
      { name: Plan.name, schema: PlanSchema },
      { name: Branch.name, schema: BranchSchema },
    ]),
  ],
  controllers: [
    PolicyController,
    ProductController,
    PlanController,
    BranchController,
  ],
  providers: [PolicyService, ProductService, PlanService, BranchService],
  exports: [PolicyService, ProductService, PlanService, BranchService],
})
export class PoliciesModule {}
