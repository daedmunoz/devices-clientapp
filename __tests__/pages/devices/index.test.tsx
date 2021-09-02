import { render, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import Devices from '../../../pages/devices';

describe('Devices', () => {
  // TODO do not mock fetch. Uae a better alternative like https://github.com/mswjs/msw
  const originalFetch = global.fetch;
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: async () => ([
        {
          id: 'e8okoP2l5',
          system_name: 'DESKTOP-SMART',
          type: 'WINDOWS_WORKSTATION',
          hdd_capacity: '"10'
        },
        {
          id: 'Th3ngERn9',
          system_name: 'MAC-LEADER',
          type: 'MAC',
          hdd_capacity: '"2048'
        },
      ])
    })) as any;
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  it('shows a list of devices', async () => {
    const screen = render(<Devices />);

    await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

    const list = screen.container.querySelector("#devicesList");

    expect(list?.childNodes.length).toBe(2);
    expect((list?.children.item(0) as HTMLLIElement).innerHTML).toContain('MAC-LEADER');
    expect((list?.children.item(1) as HTMLLIElement).innerHTML).toContain('DESKTOP-SMART');
  });

});
