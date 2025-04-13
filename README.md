# dnd-kit-solid

<p align="center">
  <img src="assets/logo.svg" alt="dnd-kit-solid logo" width="100%" />
</p>

Bringing the power of [dnd-kit](https://next.dndkit.com) to the [SolidJS](https://www.solidjs.com/).

## Key Features

- **Solid ready**: First-class support for SolidJS
- **Batteries included**: Drag, drop, sort, and reorder in any layout or direction
- **Fully extensible**: Plugins, sensors, and modifiers for complete control
- **Production ready**: Built for performance, accessibility, and reliability

## Install

```bash
npm i dnd-kit-solid @dnd-kit/dom
```

## Usage

### DragDropProvider

The `DragDropProvider` component creates a context that enables drag and drop interactions for its children. It manages the drag and drop state and coordinates between draggable and droppable elements.

#### Basic Usage

Wrap your application or a section with `DragDropProvider`:

```tsx
import { DragDropProvider } from "dnd-kit-solid";

function App() {
  return (
    <DragDropProvider>
      <YourDraggableContent />
    </DragDropProvider>
  );
}
```

#### Event Handling

Listen to drag and drop events to respond to user interactions:

```tsx
function App() {
  return (
    <DragDropProvider
      onBeforeDragStart={({ source, event }) => {
        // Optionally prevent dragging
        if (shouldPreventDrag(source)) {
          event.preventDefault();
        }
      }}
      onDragStart={({ source }) => {
        console.log("Started dragging", source.id);
      }}
      onDragMove={({ operation }) => {
        const { position } = operation;
        console.log("Current position:", position);
      }}
      onDragOver={({ source, target }) => {
        console.log(`${source.id} is over ${target.id}`);
      }}
      onDragEnd={({ source, target }) => {
        if (target) {
          console.log(`Dropped ${source.id} onto ${target.id}`);
        }
      }}
    >
      <YourDraggableContent />
    </DragDropProvider>
  );
}
```

#### Multiple Contexts

You can create multiple independent drag and drop contexts:

```tsx
function App() {
  return (
    <div>
      <DragDropProvider>
        <FileList /> {/* Files can only be dropped in this context */}
      </DragDropProvider>

      <DragDropProvider>
        <TaskList /> {/* Tasks can only be dropped in this context */}
      </DragDropProvider>
    </div>
  );
}
```

#### Configuration

Customize behavior with plugins, sensors, and modifiers:

```tsx
import {
  DragDropProvider,
  PointerSensor,
  KeyboardSensor,
  RestrictToWindow,
} from "dnd-kit-solid";

function App() {
  return (
    <DragDropProvider
      // Custom input detection
      sensors={[PointerSensor, KeyboardSensor]}
      // Extend functionality
      plugins={[AutoScroller, Accessibility]}
      // Modify drag behavior
      modifiers={[RestrictToWindow]}
    >
      <YourDraggableContent />
    </DragDropProvider>
  );
}
```

### Draggable

The `Draggable` component provides a declarative way to create draggable elements. It's a syntax sugar over the `useDraggable` hook.

#### Standalone Usage

The `Draggable` component can be used without a `DragDropProvider`. You have three options:

1. Use with `DragDropProvider` (recommended for multiple draggable / droppable elements):

```tsx
<DragDropProvider>
  <Draggable id="item-1">Drag me!</Draggable>
  <Draggable id="item-2">Drag me too!</Draggable>
</DragDropProvider>
```

2. Pass a shared manager:

```tsx
const manager = new DragDropManager();
<Draggable id="item-1" manager={manager}>Drag me!</Draggable>
<Draggable id="item-2" manager={manager}>Drag me too!</Draggable>
```

3. Use standalone (each instance creates its own manager):

```tsx
<Draggable id="item-1">Drag me!</Draggable>
```

> Note: While standalone usage is possible, it's recommended to use `DragDropProvider` or pass a shared manager when working with multiple draggable elements for better performance and stability.

#### Basic Usage

```tsx
import { Draggable } from "dnd-kit-solid";

function App() {
  return (
    <Draggable id="item-1">
      <div>Drag me!</div>
    </Draggable>
  );
}
```

#### Using with Function Children

You can use a function as children to access the draggable instance:

```tsx
function App() {
  return (
    <Draggable id="item-1">
      {({ ref, isDragging }) => (
        <div ref={ref} style={{ opacity: isDragging() ? 0.5 : 1 }}>
          Drag me!
        </div>
      )}
    </Draggable>
  );
}
```

#### Custom Tag

You can specify a custom HTML tag to render:

```tsx
function App() {
  return (
    <Draggable id="item-1" tag="button">
      Click and drag me!
    </Draggable>
  );
}
```

#### Props

The `Draggable` component accepts all the same props as the `useDraggable` hook, plus:

- `tag`: The HTML tag to render (defaults to 'div')
- `children`: Either JSX elements or a function that receives the draggable instance

### Droppable

The `Droppable` component provides a declarative way to create droppable targets. It's a syntax sugar over the `useDroppable` hook.

#### Standalone Usage

The `Droppable` component can be used without a `DragDropProvider`. You have three options:

1. Use with `DragDropProvider` (recommended for multiple droppable elements):

```tsx
<DragDropProvider>
  <Droppable id="zone-1">Drop here!</Droppable>
  <Droppable id="zone-2">Or here!</Droppable>
</DragDropProvider>
```

2. Pass a shared manager:

```tsx
const manager = new DragDropManager();
<Droppable id="zone-1" manager={manager}>Drop here!</Droppable>
<Droppable id="zone-2" manager={manager}>Or here!</Droppable>
```

3. Use standalone (each instance creates its own manager):

```tsx
<Droppable id="zone-1">Drop here!</Droppable>
```

> Note: While standalone usage is possible, it's recommended to use `DragDropProvider` or pass a shared manager when working with multiple droppable elements for better performance and stability.

#### Basic Usage

```tsx
import { Droppable } from "dnd-kit-solid";

function App() {
  return (
    <Droppable id="drop-zone">
      <div>Drop items here</div>
    </Droppable>
  );
}
```

#### Using with Function Children

You can use a function as children to access the droppable instance:

```tsx
function App() {
  return (
    <Droppable id="drop-zone">
      {({ ref, isDropTarget }) => (
        <div
          ref={ref}
          style={{ background: isDropTarget() ? "lightblue" : "white" }}
        >
          {isDropTarget() ? "Drop here!" : "Drop zone"}
        </div>
      )}
    </Droppable>
  );
}
```

#### Custom Tag

You can specify a custom HTML tag to render:

```tsx
function App() {
  return (
    <Droppable id="drop-zone" tag="section">
      Drop items here
    </Droppable>
  );
}
```

#### Props

The `Droppable` component accepts all the same props as the `useDroppable` hook, plus:

- `tag`: The HTML tag to render (defaults to 'div')
- `children`: Either JSX elements or a function that receives the droppable instance

### useDraggable

Use the `useDraggable` hook to make elements draggable that can be dropped over droppable targets.

The `useDraggable` hook requires an `id` and accepts all the same options as the `Draggable` class.

> The hook must be used within a `DragDropProvider` or provided with a manager instance.

#### Basic Usage

```tsx
import { useDraggable } from "dnd-kit-solid";

function Draggable(props) {
  const { ref } = useDraggable({
    id: props.id,
    // Optional: provide a manager if not using DragDropProvider
    // manager: props.manager,
  });

  return <div ref={ref}>Draggable</div>;
}
```

#### Specifying a Drag Handle

To specify a drag handle, use the `handleRef` returned by the hook:

```tsx
function Draggable(props) {
  const { ref, handleRef } = useDraggable({
    id: props.id,
  });

  return (
    <div ref={ref}>
      Draggable
      <button ref={handleRef}>Drag handle</button>
    </div>
  );
}
```

When you connect a drag handle element, only the element that is connected to the `handleRef` will initiate the drag operation.

#### Restricting Dragging Using Modifiers

Use modifiers to modify or restrict the behavior of draggable elements:

```tsx
import { useDraggable } from "dnd-kit-solid";
import { RestrictToHorizontalAxis } from "@dnd-kit/abstract/modifiers";

function Draggable({ id }) {
  const { ref } = useDraggable({
    id,
    modifiers: [RestrictToHorizontalAxis],
  });

  return <div ref={ref}>Draggable</div>;
}
```

#### API Reference

> The useDraggable hook is a thin wrapper around the Draggable class that makes it easier to create draggable elements in SolidJS. It therefore accepts all of the same input arguments.

##### Input

The `useDraggable` hook accepts the following arguments:

- `id` (required): The identifier of the draggable element. Should be unique within the same drag and drop context.
- `type`: Optionally supply a type to only allow this draggable element to be dropped over droppable targets that accept this type.
- `element`: If you already have a reference to the element, you can pass it instead of using the `ref`.
- `handle`: If you already have a reference to the drag handle element, you can pass it instead of using the `handleRef`.
- `disabled`: Set to `true` to prevent the draggable element from being draggable.
- `feedback`: The type of feedback that should be displayed when the element is being dragged ('default' | 'clone' | 'move' | 'none').
- `modifiers`: An array of modifiers that can be used to modify or restrict the behavior of the draggable element.
- `sensors`: An array of sensors that can be bound to the draggable element to detect drag interactions.
- `data`: Additional data about the draggable element that can be accessed in event handlers, modifiers, sensors or custom plugins.
- Event handlers: All event handlers are passed to `useDragDropMonitor` and are filtered to only trigger for this specific draggable instance:
  - `onBeforeDragStart`: Fires before drag begins (preventable)
  - `onDragStart`: Fires when drag starts
  - `onDragMove`: Fires during movement (preventable)
  - `onDragOver`: Fires when over a droppable (preventable)
  - `onCollision`: Fires on droppable collision (preventable)
  - `onDragEnd`: Fires when drag ends

##### Output

The `useDraggable` hook returns an object containing:

- `ref`: A ref callback function that can be attached to the element you want to make draggable.
- `handleRef`: A ref callback function that can be attached to an element to create a drag handle.
- `isDragging`: A boolean signal that indicates whether the draggable is currently being dragged.
- `isDropping`: A boolean signal that indicates whether the draggable is being dropped.
- `isDragSource`: A boolean signal that indicates whether the draggable is the source of the drag operation.
- `draggable`: The draggable instance that is created by the hook.

### useDroppable

Use the `useDroppable` hook to create droppable targets for draggable elements.

The `useDroppable` hook requires an `id` and accepts all the same options as the `Droppable` class.

> The hook must be used within a `DragDropProvider` or provided with a manager instance.

#### Basic Usage

```tsx
import { useDroppable } from "dnd-kit-solid";

function Droppable(props) {
  const { isDropTarget, ref } = useDroppable({
    id: props.id,
    // Optional: provide a manager if not using DragDropProvider
    // manager: props.manager,
  });

  return (
    <div ref={ref}>
      {isDropTarget()
        ? "Draggable element is over me"
        : "Drag something over me"}
    </div>
  );
}
```

#### Accepting Specific Types

You can restrict which draggable elements can be dropped by specifying the `accept` property:

```tsx
function Droppable(props) {
  const { isDropTarget, ref } = useDroppable({
    id: props.id,
    accept: "item", // Only draggable elements with type "item" can be dropped here
  });

  return (
    <div ref={ref}>
      {isDropTarget() ? "Item is over me" : "Drag an item over me"}
    </div>
  );
}
```

#### Custom Collision Detection

You can provide a custom collision detector function:

```tsx
function Droppable(props) {
  const { isDropTarget, ref } = useDroppable({
    id: props.id,
    collisionDetector: (input) => {
      // Custom collision detection logic
      return {
        id: props.id,
        data: input.draggable.data,
      };
    },
  });

  return <div ref={ref}>Drop zone</div>;
}
```

#### API Reference

> The useDroppable hook is a thin wrapper around the Droppable class that makes it easier to create droppable targets in SolidJS. It therefore accepts all of the same input arguments.

##### Input

The `useDroppable` hook accepts the following arguments:

- `id` (required): The identifier of the droppable element. Should be unique within the same drag and drop context.
- `element`: If you already have a reference to the element, you can pass it instead of using the `ref`.
- `accept`: Optionally supply a type of draggable element to only allow it to be dropped over certain droppable targets that accept this type.
- `collisionDetector`: Optionally supply a collision detector function to detect collisions between the droppable element and draggable elements.
- `collisionPriority`: Optionally supply a number to set the collision priority of the droppable element. Higher numbers have higher priority when detecting collisions.
- `disabled`: Set to `true` to prevent the droppable element from being a drop target.
- `data`: Additional data about the droppable element that can be accessed in event handlers, modifiers, sensors or custom plugins.
- `effects`: Advanced feature for setting up reactive effects that are automatically cleaned up when the component is unmounted.
- Event handlers: All event handlers are passed to `useDragDropMonitor` and are filtered to only trigger for this specific droppable instance:
  - `onBeforeDragStart`: Fires before drag begins (preventable)
  - `onDragStart`: Fires when drag starts
  - `onDragMove`: Fires during movement (preventable)
  - `onDragOver`: Fires when over a droppable (preventable)
  - `onCollision`: Fires on droppable collision (preventable)
  - `onDragEnd`: Fires when drag ends

##### Output

The `useDroppable` hook returns an object containing:

- `ref`: A ref callback function that can be attached to the element you want to use as a droppable target.
- `isDropTarget`: A boolean signal that indicates whether the element is currently being dragged over.
- `droppable`: The droppable instance that is created by the hook.

### useSortable

Use the `useSortable` hook to reorder elements in a list or across multiple lists.

The `useSortable` hook requires an `id` and an `index`. It accepts all the same options as the `Sortable` class.

> The hook must be used within a `DragDropProvider` or provided with a manager instance.

#### Basic Usage

```tsx
import { useSortable } from "dnd-kit-solid";

function SortableItem(props) {
  const { ref, isDragging } = useSortable({
    id: props.id,
    index: props.index,
    // Optional: provide a manager if not using DragDropProvider
    // manager: props.manager,
  });

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging() ? 0.5 : 1,
      }}
    >
      Item {props.id}
    </div>
  );
}
```

#### Using a Drag Handle

You can specify a drag handle to control which part of the element initiates the drag:

```tsx
function SortableItem(props) {
  const { ref, handleRef, isDragging } = useSortable({
    id: props.id,
    index: props.index,
  });

  return (
    <div ref={ref}>
      <div>Item {props.id}</div>
      <button ref={handleRef}>Drag handle</button>
    </div>
  );
}
```

#### Animating Transitions

You can add smooth transitions when items are reordered:

```tsx
function SortableItem(props) {
  const { ref, isDragging } = useSortable({
    id: props.id,
    index: props.index,
    transition: {
      duration: 200,
      easing: "ease",
      idle: true,
    },
  });

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging() ? 0.5 : 1,
        transition: "all 200ms ease",
      }}
    >
      Item {props.id}
    </div>
  );
}
```

#### API Reference

> The useSortable hook is a thin wrapper around the Sortable class that makes it easier to create sortable elements in SolidJS. It combines the functionality of useDraggable and useDroppable hooks.

##### Input

The `useSortable` hook accepts all the same arguments as the `useDraggable` and `useDroppable` hooks, plus:

- `id` (required): The identifier of the sortable element. Should be unique within the same drag and drop context.
- `index` (required): The index of the sortable element in the list.
- `transition`: Optional configuration for animating the sortable element:
  - `duration`: The duration of the transition in milliseconds
  - `easing`: The easing function to use for the transition
  - `idle`: Whether to animate when the index changes without dragging
- `element`: If you already have a reference to the element, you can pass it instead of using the `ref`.
- `handle`: If you already have a reference to the drag handle element, you can pass it instead of using the `handleRef`.
- `target`: If you already have a reference to the droppable target element, you can pass it instead of using the `targetRef`.
- `source`: If you already have a reference to the draggable source element, you can pass it instead of using the `sourceRef`.
- `accept`: Optionally supply a type of draggable element to only allow it to be dropped over certain droppable targets.
- `collisionDetector`: Optionally supply a collision detector function.
- `collisionPriority`: Optionally supply a number to set the collision priority.
- `disabled`: Set to `true` to prevent the sortable element from being sortable.
- `data`: Additional data about the sortable element.
- `effects`: Advanced feature for setting up reactive effects.

##### Output

The `useSortable` hook returns an object containing:

- `ref`: A ref callback function for the main sortable element.
- `targetRef`: A ref callback function for the droppable target element.
- `sourceRef`: A ref callback function for the draggable source element.
- `handleRef`: A ref callback function for the drag handle element.
- `isDropTarget`: A boolean signal indicating if the element is a drop target.
- `isDragSource`: A boolean signal indicating if the element is the drag source.
- `isDragging`: A boolean signal indicating if the element is being dragged.
- `isDropping`: A boolean signal indicating if the element is being dropped.
- `sortable`: The sortable instance that is created by the hook.

### useDragDropMonitor

Monitor drag and drop events in your SolidJS components.

The `useDragDropMonitor` hook allows you to monitor drag and drop events within a `DragDropProvider`.

#### Basic Usage

```tsx
import { useDragDropMonitor } from "dnd-kit-solid";

function DragMonitor() {
  useDragDropMonitor({
    onBeforeDragStart(event, manager) {
      // Optionally prevent dragging
      if (shouldPreventDrag(event.operation.source)) {
        event.preventDefault();
      }
    },
    onDragStart(event, manager) {
      console.log("Started dragging", event.operation.source);
    },
    onDragMove(event, manager) {
      console.log("Current position:", event.operation.position);
    },
    onDragOver(event, manager) {
      console.log("Over droppable:", event.operation.target);
    },
    onDragEnd(event, manager) {
      const { operation, canceled } = event;

      if (canceled) {
        console.log("Drag cancelled");
        return;
      }

      if (operation.target) {
        console.log(
          `Dropped ${operation.source.id} onto ${operation.target.id}`
        );
      }
    },
    onCollision(event, manager) {
      console.log("Collisions:", event.collisions);
    },
  });

  return null;
}
```

Make sure to use the `useDragDropMonitor` hook within a component that is wrapped in a `DragDropProvider` component.

#### Events

| Event           | Description                  | Preventable | Data                             |
| --------------- | ---------------------------- | ----------- | -------------------------------- |
| beforeDragStart | Fires before drag begins     | Yes         | operation                        |
| dragStart       | Fires when drag starts       | No          | operation, nativeEvent           |
| dragMove        | Fires during movement        | Yes         | operation, to, by, nativeEvent   |
| dragOver        | Fires when over a droppable  | Yes         | operation                        |
| collision       | Fires on droppable collision | Yes         | collisions                       |
| dragEnd         | Fires when drag ends         | No          | operation, canceled, nativeEvent |

#### Notes

- The hook must be used within a `DragDropProvider`
- Event handlers receive both the event data and the manager instance
- Use `event.preventDefault()` on preventable events to stop their default behavior
- The `dragEnd` event includes a `canceled` property that replaces the old `onDragCancel` event
- Event handlers are automatically cleaned up when the component is unmounted

### useDragOperation

Access the current drag operation state in your SolidJS components.

The `useDragOperation` hook provides reactive access to the current drag operation state, including the dragged element, drop target, and position.

#### Basic Usage

```tsx
import { useDragOperation } from "dnd-kit-solid";

function DragOperationMonitor() {
  const operation = useDragOperation();

  return (
    <div>
      {operation.source && <div>Dragging: {operation.source.id}</div>}
      {operation.target && <div>Over: {operation.target.id}</div>}
      {operation.position && (
        <div>
          Position: {operation.position.x}, {operation.position.y}
        </div>
      )}
      <div>Status: {operation.status}</div>
      {operation.canceled && <div>Operation was canceled</div>}
    </div>
  );
}
```

#### Using with Custom Manager

If you need to use the hook outside of a `DragDropProvider`, you can pass a manager instance:

```tsx
function CustomDragMonitor(props) {
  const operation = useDragOperation({
    manager: props.manager,
  });

  return <div>{operation.source?.id}</div>;
}
```

#### API Reference

##### Input

The `useDragOperation` hook accepts an optional options object:

- `manager`: Optional `DragDropManager` instance. If not provided, the hook will use the manager from the nearest `DragDropProvider`.

##### Output

The `useDragOperation` hook returns a reactive store containing:

- `source`: The currently dragged element (or `null` if no drag is in progress)
- `target`: The current drop target (or `null` if not over a valid target)
- `position`: The current drag coordinates (or `null` if no drag is in progress)
- `status`: The current operation status
- `canceled`: Whether the operation was canceled

#### Notes

- The hook must be used within a `DragDropProvider` unless a manager is explicitly provided
- All properties are reactive and will update automatically when the drag operation state changes
- The store is automatically disposed when the component is unmounted

## Development

### Setup

```bash
# Install dependencies
npm install
```

### Building

Build the library for production:

```bash
npm run build
```

This generates:

- CommonJS build in `dist/cjs/`
- ES Modules build in `dist/esm/`
- TypeScript type definitions in `dist/types/`

## Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/your-username/sorta.git
   cd sorta
   ```
3. **Install** dependencies:
   ```bash
   npm install
   ```
4. **Create** a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
5. **Make** your changes and ensure:
   - All tests pass (`npm test`)
   - Code is properly linted (`npm run lint`)
   - TypeScript types are correct
   - Documentation is updated
6. **Commit** your changes with a descriptive message
7. **Push** to your fork
8. **Create** a Pull Request

### Development Guidelines

- Follow the existing code style and patterns
- Write tests for new features
- Update documentation as needed
- Keep the bundle size minimal
- Ensure cross-browser compatibility
- Use TypeScript for type safety
- Maintain compatibility with the original dnd-kit API where possible
- Follow SolidJS best practices

### Code of Conduct

Please be respectful and considerate of others when contributing. We follow the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) code of conduct.

## License

MIT
