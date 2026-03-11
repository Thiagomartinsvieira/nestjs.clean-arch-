import { Entity } from '../../entity';

type StubProps = {
  prop1: string;
  prop2: number;
};

function uuidValidate(uuid: string): boolean {
  const regex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/i;
  return regex.test(uuid);
}

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
  it('Should set props and id', () => {
    const props = { prop1: 'value', prop2: 16 };

    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);

    expect(entity._id).not.toBeNull();
    expect(uuidValidate(entity._id)).toBeTruthy();
  });

  it('Should accept a valid uuid', () => {
    const props = { prop1: 'value', prop2: 16 };

    const id = 'aef65c8b-f6c5-4192-b293-990cd69e1897';

    const entity = new StubEntity(props, id);

    expect(uuidValidate(entity._id)).toBeTruthy();
    expect(entity._id).toBe(id);
  });

  it('Should convert a entity to a javascript Object', () => {
    const props = { prop1: 'value', prop2: 16 };

    const id = 'aef65c8b-f6c5-4192-b293-990cd69e1897';

    const entity = new StubEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    });
  });
});
