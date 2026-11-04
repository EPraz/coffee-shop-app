# Architecture checkpoint

Apply this checkpoint when adding an application, backend, authentication,
administration, persistence integration or functionality spanning existing owners.

Before implementation, read the accepted architecture decisions and identify the
owner of every new responsibility, its public interface and its dependencies.
Record a new decision when the architectural shape changes meaningfully. Routine
changes within an accepted design can proceed without another approval round.

Before closing work, review the complete affected modules for responsibility,
dependency direction, public interfaces and style ownership. Run the architecture
audit and the applicable workflow regressions. Functional success and small files
are separate evidence from structural coherence; report both.

For this repository, [ADR 0001](../adr/0001-feature-modules-and-app-workspaces.md)
defines ownership. `npm run check:architecture` checks application isolation,
shared-layer direction, contracts access, runtime import cycles, explicit NestJS
module imports and unique provider/controller ownership. Its configuration is
versioned in `architecture.config.json`.

This checkpoint is portable to other projects: keep the trigger and review steps
in shared agent instructions; define folders, dependency rules and executable
checks in each project's own architecture decision and configuration.
